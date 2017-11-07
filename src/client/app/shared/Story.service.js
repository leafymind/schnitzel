import EventEmitter from 'eventemitter3';
import DB from './DB';
import { format } from './format';
import info from './info';

function delayOf(time)
{
  // return Promise.resolve();
  return new Promise(resolve => setTimeout(resolve, time));
}

function userStore(storyName, callback)
{
  return DB.local.user.get(storyName)
    .then(story => DB.local.user.put(Object.assign({}, story, callback(story))))
    .catch(console.error.bind(console))
  ;
}

class Story extends EventEmitter
{
  addIncomming(ids)
  {
    const storiesIterator = ids.map(id => DB.local.story.get(id)).entries();

    return userStore('story', () => ({ query: ids }))
      .then(() => delayOf(1000))
      .then(() => this._walk(storiesIterator))
    ;
  }

  addOutgoing(message)
  {
    return userStore('story', entry => ({ messages: entry.messages.concat([message]) })).then(() =>
    {
      this.emit('message', message);
    });
  }

  _walk(storiesIterator)
  {
    const iteratedStory = storiesIterator.next();

    if (!iteratedStory.done)
    {
      const [, storyPromise] = iteratedStory.value;

      return storyPromise.then(story =>
      {
        if (story.message)
        {
          let wait = 1500;

          if (story.message.delay)
          {
            wait += story.message.delay;
          }

          story.message.text = format(story.message.text, info);
          story.message.id = story._id;

          delayOf(wait)
            .then(() =>
            {
              if (story.message.text)
              {
                this.emit('typing');

                return delayOf((story.message.text.length * 50));
              }
            })
            .then(() => userStore('story', entry =>
            {
              entry.query.splice(entry.query.indexOf(story._id), 1);

              return {
                messages: entry.messages.concat([story.message]),
                query: entry.query
              };
            }))
            .then(() =>
            {
              this.emit('message', story.message);

              if (story.answer)
              {
                this.emit('answer', story.answer);
              }

              this._walk(storiesIterator);
            })
          ;
        }
        else if (story.answer)
        {
          userStore('story', entry =>
          {
            entry.query.splice(entry.query.indexOf(story._id), 1);
            return { query: entry.query };
          })
            .then(() =>
            {
              this.emit('answer', story.answer);
              this._walk(storiesIterator);
            })
          ;
        }
      });
    }
    else
    {
      console.log('done');
    }
  }
}

export default new Story();
