<div class="mdl-card mdl-shadow--2dp quest-item">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">{{quest.caption}}</h2>
  </div>

  {{#if quest.type === 'CHOICE'}}
    <QuestChoice bind:quest on:done="fire('done', { quest })" on:wrong="fire('wrong', { quest })" />
  {{else}}
    <div class="mdl-card__supporting-text">{{quest.type}}</div>
  {{/if}}
</div>

<script>
  import QuestChoice from './quest-choice/quest-choice.svelte';

  export default
  {
    components:
    {
      QuestChoice
    }
  }
</script>
