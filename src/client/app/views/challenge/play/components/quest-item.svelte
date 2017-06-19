<div class="mdl-card mdl-shadow--2dp quest-item">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">{{quest.caption}}</h2>
  </div>

  {{#if quest.type === 'GPS'}}
    <QuestGps bind:quest="quest" on:done="fire('done', { quest })" />
  {{else}}
    <div class="mdl-card__supporting-text">{{quest.type}}</div>
  {{/if}}
</div>

<script>
  import QuestGps from './quest-gps/quest-gps.svelte';

  export default
  {
    components:
    {
      QuestGps
    }
  }
</script>
