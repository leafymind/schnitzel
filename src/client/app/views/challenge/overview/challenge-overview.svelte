<div class="content">
  {{#each challenges as challenge}}
    <ChallengeItem bind:challenge link="{{asr.makePath('app.conversation', { id: challenge._id })}}"></ChallengeItem>
  {{/each}}
</div>

<script>
  import ChallengeItem from './components/challenge-item/challenge-item.svelte';

  export default {
    components:
    {
      ChallengeItem
    }
  };
</script>
