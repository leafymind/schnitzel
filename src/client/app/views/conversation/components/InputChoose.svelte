<div>
  <span ref:btn id="choose-answer" class="mdl-color-text--primary">
    {{#if chosenAnswer}}
      {{chosenAnswer.text}}
    {{else}}
      Antwort auswählen
    {{/if}}
  </span>

  {{#if chosenAnswer && chosenAnswer.type === 'text'}}
    <InputText ref:chosenAnswerInput bind:answer="chosenAnswer" on:input="input(chosenAnswer, event.input)" on:enter />
  {{/if}}

  <ul ref:menu class="mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect" data-mdl-for="choose-answer">
    {{#each answer.options as answer}}
      <li class="mdl-menu__item" on:click="chosen(answer)">
        {{answer.text}}
        {{#if answer.type === 'text'}}...{{/if}}
      </li>
    {{/each}}
  </ul>
</div>

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
  import InputText from './InputText';

  export default
  {
    components:
    {
      InputText
    },

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

        if (chosenAnswer.type)
        {
          const input = this.refs.chosenAnswerInput.refs.input;
          input.innerText = '';
          input.focus();
        }
        else
        {
          this.fire('chosen', { answer: chosenAnswer });
        }
      },

      input(chosenAnswer, input)
      {
        if (chosenAnswer.expect.every(word => input.toLowerCase().includes(word)))
        {
          this.fire('chosen', { answer: Object.assign({}, chosenAnswer, { text: chosenAnswer.text + ' ' + input }) });
        }
        else
        {
          this.fire('chosen', {});
        }
      }
    },

    oncreate()
    {
      componentHandler.upgradeElement(this.refs.menu);
    }
  }
</script>
