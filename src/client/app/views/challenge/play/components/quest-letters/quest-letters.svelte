<div class="mdl-card__title">
  <h2 class="mdl-card__title-text letters">
    {{#each outputLetters as letter}}
      <span class="letter {{getLetterClass(letter)}}">{{letter.display}}</span>
    {{/each}}
  </h2>
</div>
<div class="mdl-card__actions mdl-card--border input-letters">
  {{#each inputLetters as letter}}
    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" on:tap="input(inputIndex, outputLetters, letter)">{{letter}}</button>
  {{/each}}
</div>

<style>
  .letter
  {
    width: 25px;
    text-align: center;

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

    data: () => ({ inputIndex: 0 }),

    helpers:
    {
      getLetterClass(letter)
      {
        return letter.isEmpty ? '' : (letter.isCorrect ? 'correct' : 'wrong');
      }
    },

    computed:
    {
      outputLetters(quest)
      {
        return quest.expect.split('')
          .map((char, i) =>
          {
            const isLetter = /[a-zäüöß]/i.test(char);

            return {
              char,
              display: isLetter? '_' : char,
              isEmpty: isLetter,
              isCorrect: !isLetter
            };
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
      input(inputIndex, outputLetters, letter)
      {
        const current = outputLetters[inputIndex];

        current.display = letter;
        current.isEmpty = false;
        current.isCorrect = current.char === letter;

        if (current.isCorrect)
        {
          inputIndex++;

          if (outputLetters.length === inputIndex)
          {
            this.fire('done');
          }
        }
        else
        {
          this.fire('wrong');
        }

        this.set({ inputIndex, outputLetters });
      }
    }
  }
</script>
