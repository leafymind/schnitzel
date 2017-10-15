<div class="mdl-card">
  <div class="mdl-card__title cover">
    <h2 class="mdl-card__title-text">{{challenge.title}}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    {{challenge.desc}}
  </div>
</div>

<div class="content">
  <QuestItem bind:quest="quests[current]" on:done="done(event.quest)" on:wrong="wrong(event.quest)"></QuestItem>

  <div class="mdl-card mdl-shadow--2dp">
    <div class="mdl-card__supporting-text">
      <pre>{{json(quests)}}</pre>
    </div>
  </div>
</div>

<style>
  .mdl-card__title.cover
  {
    color: #fff;
    height: 180px;
    background: url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover;
    text-shadow: 2px 2px 3px #000;
  }

  :global(.quest-item)
  {
    margin-bottom: 1rem;
  }

  pre
  {
    margin: 0
  }
</style>

<script>
  import DB from '../../../shared/DB.js';
  import quests from '../../../shared/test-quests';
  import QuestItem from './components/quest-item.svelte';

  export default
  {
    components:
    {
      QuestItem
    },

    data()
    {
      return {
        quests: quests.map((item, i) => { item.id = i; return item; }),
        current: 0
      }
    },

    helpers:
    {
      json(obj)
      {
        return JSON.stringify(obj, null, 2);
      }
    },

    methods:
    {
      done(quest)
      {
        console.log('Quest accomplished!', quest);

        const snackbarContainer = document.getElementById('snackbar');
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'Richtig!' });

        this.set({ current: this.get('current') + 1 });
      },

      wrong(quest)
      {
        console.warn('Wrong guess!', quest);

        const snackbarContainer = document.getElementById('snackbar');
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'Falsch :(' });
      }
    }
  };
</script>
