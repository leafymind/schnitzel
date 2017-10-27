<div>
  <button ref:btn id="choose-answer" class="mdl-color-text--primary">
    {{#if chosenAnswer}}
      {{chosenAnswer.text}}
    {{else}}
      Antwort auswählen
    {{/if}}
  </button>

  <ul ref:menu class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect" data-mdl-for="choose-answer">
    {{#each answer.options as answer}}
      <li class="mdl-menu__item" on:click="chosen(answer)">{{answer.text}}</li>
    {{/each}}
  </ul>
</div>

<style>
  button
  {
    width: 100%;
    appearance: none;
    border: 0;
    padding: 0;
    margin: 0;
    color: inherit;
    font-size: inherit;
    background: transparent;
    outline: 0;
    text-align: left;
  }

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
  export default
  {
    methods:
    {
      reset()
      {
        this.set({ chosenAnswer: undefined });
        this.refs.btn.classList.add('mdl-color-text--primary');
      },

      chosen(chosenAnswer)
      {
        this.refs.btn.classList.remove('mdl-color-text--primary');
        this.set({ chosenAnswer });
        this.fire('chosen', { answer: chosenAnswer });
      }
    },

    oncreate()
    {
      componentHandler.upgradeElement(this.refs.menu);
    }
  }
</script>
