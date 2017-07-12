import QuestLetters from './quest-letters.svelte';

describe('Challenge Play', () =>
{
  describe('Quest Letters', () =>
  {
    const target = document.createElement('div');
    const data = {
      clearTime: 0,
      quest:
      {
        type: 'LETTERS',
        caption: 'Ersten 3 Buchstaben vom Alphabeth?',
        expect: 'ABC'
      }
    };

    let component, inputButtogns, inputLetters, outputLetters;

    it('Given the current quest is of type "LETTERS"', () =>
    {
      component = new QuestLetters({ target, data });

      inputButtons = target.querySelectorAll('.input-letters button');
      inputLetters = Array.from(inputButtons).map(button => button.textContent);
      outputLetters = target.querySelectorAll('.letters .letter');
    })

    it('Then I see underscores for each letter of the answer', () =>
    {
      assert.equal(data.quest.expect.length, target.querySelectorAll('.letters .letter').length);
    })

    it('And I should see a button for each letter of the answer in a shuffled order', () =>
    {
      const containsAllExpectedLeters = data.quest.expect.split('').every(letter =>
      {
        return inputLetters.includes(letter);
      });

      assert.isTrue(containsAllExpectedLeters);
    })

    it('And I should see some extra letters which not necessarily belong to the answer', () =>
    {
      assert.isAbove(inputLetters.length, data.quest.expect.length);
    })

    it('When I click on the button with the first letter of the answer', () =>
    {
      // tap(Array.from(inputButtons).find(button => button.textContent === data.quest.expect.charAt(0)));
      component.input
      (
        data.quest,
        component.get('answer'),
        data.quest.expect.charAt(0)
      );
    })

    it('Then the first underscore get\'s replaced by the first letter', () =>
    {
      assert.equal(outputLetters[0].textContent, data.quest.expect.charAt(0));
    })

    it('And the first letter get\'s highlighted green', () =>
    {
      assert.isTrue(outputLetters[0].classList.contains('correct'));
    })

    it('When I click on a button which is not the second letter', () =>
    {
      component.input
      (
        data.quest,
        component.get('answer'),
        data.quest.expect.charAt(1) === 'A' ? 'B' : 'A'
      );
    })

    it('Then the second underscore get\'s replaced by the wrong letter', () =>
    {
      assert.notEqual(outputLetters[1].textContent, '_');
    })

    it('And the second letter get\'s highlighted red', () =>
    {
      assert.isTrue(outputLetters[1].classList.contains('wrong'));
    })

    it('Then after a few seconds the entered answer get\'s cleared', () =>
    {
      assert.equal(component.get('answer'), '');
    })
  })
})
