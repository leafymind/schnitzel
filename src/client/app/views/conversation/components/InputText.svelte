<Input>
  <span slot="field">
    {{#if answer.prefix}}
      <span>{{answer.prefix}}</span>
    {{/if}}
    <span ref:input contenteditable="true" placeholder="{{answer.placeholder}}" on:input="input(answer, event)" on:enter="refs.btn.click()"></span>
  </span>
  <button slot="button" disabled ref:btn on:click="fire('send', { value })"
          class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">send</i>
  </button>
</Input>

<style>
  ref:input
  {
    display: inline-block;
    outline: 0;
    white-space: nowrap;
  }

  ref:input br
  {
    display: none;
  }

  ref:input:empty:not([placeholder=""])::before
  {
    content: attr(placeholder);
    color: #999;
  }

  ref:input:empty[placeholder=""]::before
  {
    content: 'Antwort';
    color: #999;
  }
</style>

<script>
  import { enter } from '../../../shared/component-events';
  import Input from './Input';

  export default
  {
    events: { enter },

    components: { Input },

    methods:
    {
      input(answer, event)
      {
        const value = event.target.innerText;
        const valid = answer.expect ? answer.expect.every(word => value.toLowerCase().includes(word)) : value.length >= answer.min;

        this.refs.btn.disabled = !valid;

        if (valid)
        {
          this.set({ value });
        }
      }
    },

    oncreate()
    {
      this.refs.input.focus();
    }
  };
</script>
