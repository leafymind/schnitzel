<div class="conversation">
  <ScrollContainer>
    <div>
      {{#each messages as message}}
        {{#if message.dir == 'out'}}
          <div in:fade="{ duration: 100 }">
            <SpeechBubble class="right" contentClass="mdl-color--primary mdl-color-text--primary-contrast" arrowClass="mdl-color-text--primary">
              {{message.text}}
            </SpeechBubble>
          </div>
        {{else}}
          <div in:fade="{ duration: 100 }" title="{{message.id}}">
            <SpeechBubble class="left">
              {{message.text}}
            </SpeechBubble>
          </div>
        {{/if}}
      {{/each}}
    </div>

    <div class="typing-indicator">
      {{#if typing}}
        <div in:fly="{ y: 30, duration: 500 }" out:fly="{ y: -50, duration: 300 }">
          <SpeechBubble class="left typing" />
        </div>
      {{/if}}
    </div>
  </ScrollContainer>
</div>

<div class="input">
  <div class="text-field">
    {{#if answer && answer.type === 'choise' && answer.options.length}}
      <InputChoose ref:inputChoose bind:answer on:chosen="onChoise(event.answer)" on:enter="send(messages, answer, input)" />
    {{elseif answer && answer.type === 'text'}}
      <InputText ref:inputText bind:answer on:input="onInput(answer, event.input)" on:enter="send(messages, answer, input)" />
    {{else}}
      <div class="mdl-color-text--grey">
        Antwort auswählen
      </div>
    {{/if}}
  </div>
  <button ref:sendButton on:click="send(messages, answer, input)" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">send</i>
  </button>
</div>

<style>
  :global(.mdl-layout__content),
  :global(.page-content)
  {
    display: flex;
    flex-direction: column;
  }

  :global(.page-content)
  {
    flex: 1;
  }

  .conversation
  {
    position: relative;
    flex: 1;
  }

  .input
  {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, .3);
  }

  .input > div
  {
    flex: 1;
  }

  .typing-indicator
  {
    height: 52px;
  }
</style>

<script>
  import Story from '../../shared/Story.service';
  import Header from '../../shared/Header.service';
  import info from '../../shared/info';
  import { format } from '../../shared/format';

  import { fly, fade } from 'svelte-transitions';

  import ScrollContainer from './components/ScrollContainer';
  import SpeechBubble from './components/SpeechBubble';
  import InputChoose from './components/InputChoose';
  import InputText from './components/InputText';

  export default
  {
    transitions: { fly, fade },

    components:
    {
      ScrollContainer,
      SpeechBubble,
      InputChoose,
      InputText
    },

    // data()
    // {
    //   return { typing: true };
    // },

    methods:
    {
      onChoise(input)
      {
        this.set({ input });
        this.refs.sendButton.disabled = !input;
      },

      onInput(answer, input)
      {
        this.set({ input });
        this.refs.sendButton.disabled = !input.length;
      },

      send(messages, answer, input)
      {
        let text;

        if (answer.type === 'choise')
        {
          text = input.text;
        }
        else if (answer.type === 'text')
        {
          const parts = [];

          if (answer.prefix)
          {
            parts.push(answer.prefix);
          }

          parts.push(input);

          if (answer.suffix)
          {
            parts.push(answer.suffix);
          }

          text = parts.join(' ');
        }

        Story.addOutgoing({ text, dir: 'out' });

        this.refs.sendButton.disabled = true;
        this.set({ answer: undefined, messages });

        console.log(answer, input);

        const responses = [];

        if (input.trigger)
        {
          responses.push(...input.trigger);
        }

        if (answer.trigger)
        {
          responses.push(...answer.trigger);
        }

        if (answer.finally && answer.options.length === 1)
        {
          responses.push(...answer.finally);
        }

        if (answer.action === 'saveName')
        {
          info.name = input;
        }

        Story.addIncomming(responses);
      }
    },

    oncreate()
    {
      this.refs.sendButton.disabled = true;

      const messages = this.get('messages');

      Story.on('typing', () =>
      {
        this.set({ typing: true });
      });

      Story.on('message', message =>
      {
        messages.push(message);
        this.set({ messages, typing: false });

        if (message.action === 'setHero')
        {
          Header.emit('viewTitle', info.hero);
        }

        if (message.dir !== 'out')
        {
          window.navigator.vibrate(200);
        }
      });

      Story.on('answer', answer =>
      {
        if (answer.type === 'choise')
        {
          answer.options = answer.options
            .filter(option =>
            {
              return !option.condition ||
                     option.condition.not && !messages.find(message => option.condition.not === message.id) ||
                     option.condition.has && !!messages.find(message => option.condition.has === message.id)
              ;
            })
            .map(option =>
            {
              option.text = format(option.text, info);
              return option;
            })
          ;
        }

        this.set({ answer });
      });
    }
  };
</script>
