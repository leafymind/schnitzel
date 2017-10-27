import Conversation from './conversation.svelte';
// import DB from '../../../shared/DB';
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
      return DB.local.story.get(params.id) // TODO improve since you can use every message
        .then(story => ({ messages: [story.message], answer: story.answer }))
      ;
    },
    activate()
    {
      Header.emit('viewTitle', 'Unbekannt');
    }
  });
}
