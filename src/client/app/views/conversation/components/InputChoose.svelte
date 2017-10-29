<Input>
  <div slot="field">
    <span ref:dropdown id="choose-answer" class="mdl-color-text--primary">
      {{#if selected}}
        {{selected.text}}
      {{else}}
        Antwort auswählen
      {{/if}}
    </span>
  </div>
  <button slot="button" disabled ref:btn on:click="fire('send', { selected })"
          class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">send</i>
  </button>
</Input>

<ul ref:menu class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect" data-mdl-for="choose-answer">
  {{#each answer.options as answer}}
    <li class="mdl-menu__item" on:click="chosen(answer)">
      {{answer.text}}
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
</style>

<script>
  import Input from './Input';

  export default
  {
    components: { Input },

    methods:
    {
      chosen(selected)
      {
        this.refs.dropdown.classList.remove('mdl-color-text--primary');
        this.refs.btn.disabled = false;
        this.set({ selected });
      }
    },

    oncreate()
    {
      componentHandler.upgradeElement(this.refs.menu);
    }
  }
</script>
