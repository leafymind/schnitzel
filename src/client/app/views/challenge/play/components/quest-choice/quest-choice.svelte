{{#each quest.choises as answer}}
  <div class="mdl-card__actions mdl-card--border">
    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" on:tap="select(quest, answer)">{{answer}}</button>
  </div>
{{/each}}

<script>
  import { tap } from '../../../../../shared/component-events';

  export default
  {
    events: { tap },

    methods:
    {
      select(quest, answer)
      {
        if (quest.expect === answer)
        {
          this.fire('done');
        }
      }
    }
  }
</script>
