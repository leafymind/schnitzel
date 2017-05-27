<div class="challenges">
  {{#each challenges as challenge}}
    <ChallengeItem bind:title="challenge.title" bind:desc="challenge.desc" link="{{asr.makePath('app.play', { id: challenge.id })}}"></ChallengeItem>
  {{/each}}
</div>

<script>
  import ChallengeItem from './components/challenge-item/challenge-item.svelte';
  import { challenges } from '../../../model/challenges.js';

  export default {
    components:
    {
      ChallengeItem
    },

    data()
    {
      return { challenges };
    }
  };
</script>
