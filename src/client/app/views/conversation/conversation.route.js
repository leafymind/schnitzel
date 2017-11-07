import Conversation from './conversation.svelte';
import DB from '../../shared/DB';
import Header from '../../shared/Header.service';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.conversation',
    route: '/conversation/:id',
    template: Conversation,
    resolve(data, params)
    {
      const storyName = 'story';  // TODO rename story DB into a unique name like story_{uid}

      return DB.local.user.get(storyName)
        .then(history =>
        {
          const lastMessage = history.messages[history.messages.length - 1];

          if (lastMessage.id)
          {
            return DB.local.story.get(lastMessage.id).then(story =>
            {
              if (!story.answer && !history.query)
              {
                console.error('Dead end!');
              }

              return { messages: history.messages, answer: story.answer, query: history.query };
            });
          }
          else
          {
            return { messages: history.messages, query: history.query };
          }
        })
        .catch(() => DB.local.challenges.get(params.id)
          .then(challenge => DB.local.story.get(challenge.story))
          .then(story =>
          {
            story.message.id = story._id;

            return DB.local.user.put({ _id: storyName, messages: [story.message], query: [] }).then(() =>
            {
              return { messages: [story.message], query: [], answer: story.answer };
            });
          })
        )
      ;
    },
    activate()
    {
      Header.emit('viewTitle', 'Unbekannt'); // TODO remember hero name
    }
  });
}
