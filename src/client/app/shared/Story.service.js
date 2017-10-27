import EventEmitter from 'eventemitter3';
import DB from './DB';
import { format } from './format';
import info from './info';

function delayOf(time)
{
  // return Promise.resolve();
  return new Promise(resolve => setTimeout(resolve, time));
}

class Story extends EventEmitter
{
  addIncomming(ids)
  {
    const storiesIterator = ids.map(id => DB.local.story.get(id)).entries();

    delayOf(1000).then(() =>
    {
      this._walk(storiesIterator);
    });
  }

  addOutgoing(message)
  {
    this.emit('message', message);
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
          delayOf(wait)
            .then(() =>
            {
              if (story.message.text)
              {
                this.emit('typing');

                return delayOf((story.message.text.length * 50));
              }
            })
            .then(() =>
            {
              story.message.text = format(story.message.text, info);
              story.message.id = story._id;

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
          this.emit('answer', story.answer);
          this._walk(storiesIterator);
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
