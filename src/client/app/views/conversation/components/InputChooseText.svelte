<Input>
  <div slot="field">
    <span ref:dropdown id="choose-answer" class="mdl-color-text--primary">
      {{#if selected}}
        {{selected.text}}
      {{else}}
        Antwort auswählen
      {{/if}}
    </span>

    {{#if selected && selected.type === 'text'}}
      <span ref:input contenteditable="true" placeholder="{{selected.placeholder}}" on:input="input(selected, event)" on:enter="refs.btn.click()"></span>
    {{/if}}
  </div>
  <button slot="button" disabled ref:btn on:click="fire('send', { value })"
          class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">send</i>
  </button>
</Input>

<ul ref:menu class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect" data-mdl-for="choose-answer">
  {{#each answer.options as answer}}
    <li class="mdl-menu__item" on:click="chosen(answer)">
      {{answer.text}}
      {{#if answer.type === 'text'}}...{{/if}}
    </li>
  {{/each}}
</ul>

<style>
  .mdl-menu
  {
    max-width: calc(100vw - 2rem);
  }

  .mdl-menu__item
  {
    height: auto;
    padding: 10px 16px;
    line-height: inherit;
    text-overflow: ellipsis;
  }

  ref:input
  {
    display: inline-block;
    outline: 0;
    white-space: nowrap;
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
      chosen(selected)
      {
        this.refs.dropdown.classList.remove('mdl-color-text--primary');
        this.set({ selected });

        if (selected.type)
        {
          const input = this.refs.input;
          input.innerText = '';
          input.focus();
        }
      },

      input(selected, event)
      {
        const value = event.target.innerText;
        const valid = selected.expect.every(word => value.toLowerCase().includes(word));

        this.refs.btn.disabled = !valid;

        if (valid)
        {
          this.set({ value: Object.assign({}, selected, { text: selected.text + ' ' + value }) });
        }
      }
    },

    oncreate()
    {
      componentHandler.upgradeElement(this.refs.menu);
    }
  }
</script>
