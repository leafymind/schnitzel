<div class="mdl-card__title">
  <h2 class="mdl-card__title-text letters">
    {{#each outputLetters as letter}}
      <span class="letter {{getLetterClass(letter)}}">{{letter.char}}</span>
    {{/each}}
  </h2>
</div>
<div class="mdl-card__actions mdl-card--border input-letters">
  {{#each inputLetters as letter}}
    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" on:tap="input(quest, answer, letter)">{{letter}}</button>
  {{/each}}
</div>

<style>
  .letter
  {
    margin: 4px;

    &.correct
    {
      color: green;
    }

    &.wrong
    {
      color: #c00;
      font-weight: bold;
      animation: blink 1s infinite;
    }
  }

  @keyframes blink
  {
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
</style>

<script>
  import { tap } from '../../../../../shared/component-events.js';

  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÜÖß'.split('');

  function shuffle(array)
  {
    return array.sort((a, b) => .5 - Math.random());
  }

  export default
  {
    events: { tap },

    data: () => ({ answer: '' }),

    helpers:
    {
      getLetterClass(letter)
      {
        return letter.isEmpty ? '' : (letter.isCorrect ? 'correct' : 'wrong');
      }
    },

    computed:
    {
      outputLetters(quest, answer)
      {
        const underscores = quest.expect.replace(/[a-z]/gi, '_');

        return underscores.split('')
          .map((item, i) =>
          {
            if (answer.charAt(i) === '')
            {
              return { char: underscores.charAt(i), isEmpty: true };
            }
            else
            {
              return { char: answer.charAt(i), isCorrect: answer.charAt(i) === quest.expect.charAt(i) }
            }
          })
        ;
      },

      inputLetters(quest)
      {
        let expectLetters = shuffle(quest.expect.split(''));
        let randomLetters = shuffle(alpha);

        return shuffle(expectLetters.concat(randomLetters.slice(0, 5))).reverse();
      }
    },

    methods:
    {
      input(quest, answer, letter)
      {
        answer += letter;

        this.set({ answer });

        if (quest.expect === answer)
        {
          this.fire('done');
        }
      }
    }
  }
</script>
