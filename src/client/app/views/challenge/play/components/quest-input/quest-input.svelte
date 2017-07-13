<form on:submit="validate(event, quest, answer)" autocomplete="off">
  <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="quest-input-{{quest.id}}" bind:value="answer" />
    <label class="mdl-textfield__label" for="quest-input-{{quest.id}}">Antwort eingeben ...</label>
  </div>
  <button class="mdl-button mdl-js-button mdl-button--primary">OK</button>
</form>

<style>
  form
  {
    display: flex;
    align-items: center;
    margin: 0 1rem;
  }
</style>

<script>
  export default
  {
    data()
    {
      return { answer: '' };
    },

    methods:
    {
      validate(e, quest, answer)
      {
        e.preventDefault();

        const isCorrectSingleAnswer = typeof quest.expect === 'string' && answer.toLowerCase() === quest.expect.toLowerCase();
        const isCorrectMultipleWordsAnswer = Array.isArray(quest.expect) && quest.expect.every(expectedWord => answer.includes(expectedWord));

        if (isCorrectSingleAnswer || isCorrectMultipleWordsAnswer)
        {
          this.fire('done');
        }
        else
        {
          this.fire('wrong');
        }
      }
    }
  }
</script>
