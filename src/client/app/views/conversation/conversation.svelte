<div class="conversation">
  <ScrollContainer>
    <div>
      {{#each messages as message}}
        {{#if message.dir == 'out'}}
          <div in:fade="{ duration: 100 }">
            <SpeechBubble class="right" contentClass="mdl-color--primary mdl-color-text--primary-contrast" arrowClass="mdl-color-text--primary">
              <span class="text">{{message.text}}</span>
            </SpeechBubble>
          </div>
        {{else}}
          <div in:fade="{ duration: 100 }" title="{{message.id}}">
            <SpeechBubble class="left">
              <span class="text">{{message.text}}</span>
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

{{#if answer}}
  {{#if answer.type === 'choise' && answer.options.length}}
    <InputChoose bind:answer on:send="send(messages, answer, event.selected)" />
  {{elseif answer.type === 'choise-text' && answer.options.length}}
    <InputChooseText bind:answer on:send="send(messages, answer, event.value)" />
  {{elseif answer.type === 'text'}}
    <InputText bind:answer on:send="send(messages, answer, event.value)" />
  {{elseif answer.type === 'geo'}}
    <InputGeo bind:answer on:arrived="send(messages, answer, event.position)" />
  {{else}}
    <Input />
  {{/if}}
{{else}}
  <Input />
{{/if}}

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

  .typing-indicator
  {
    height: 52px;
  }
</style>

<script>
  import Story from '../../shared/Story.service';
  import Header from '../../shared/Header.service';
  import notify from '../../shared/Notify.service';
  import info from '../../shared/info';
  import { format } from '../../shared/format';

  import { fly, fade } from 'svelte-transitions';

  import ScrollContainer from './components/ScrollContainer';
  import SpeechBubble from './components/SpeechBubble';
  import Input from './components/Input';
  import InputChoose from './components/InputChoose';
  import InputChooseText from './components/InputChooseText';
  import InputText from './components/InputText';
  import InputGeo from './components/InputGeo';

  export default
  {
    transitions: { fly, fade },

    components:
    {
      ScrollContainer,
      SpeechBubble,
      Input,
      InputChoose,
      InputText,
      InputChooseText,
      InputGeo
    },

    // data()
    // {
    //   return { typing: true };
    // },

    methods:
    {
      send(messages, answer, input)
      {
        let text;

        if (answer.type === 'choise' || answer.type === 'choise-text')
        {
          text = input.text;
        }
        else if (answer.type === 'geo')
        {
          text = answer.text;
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
      },

      arrived(position)
      {
        console.log(position);

        notify('Ziel erreicht!', null, 'location_on');
      }
    },

    oncreate()
    {
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
          notify(message.text, info.hero);
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
