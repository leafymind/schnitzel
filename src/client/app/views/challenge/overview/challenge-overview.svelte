<div class="challenges">
  {{#each challenges as challenge}}
    <ChallengeItem title="{{challenge.title}}" desc="{{challenge.desc}}" link="{{challenge.link}}" />
  {{/each}}
</div>

<script>
  import ChallengeItem from './components/challenge-item/challenge-item.svelte';

  export default {
    data()
    {
      return {
        challenges:
        [
          {
            title: 'Challenge A',
            desc: 'Auf den Spuren von Bla bla...'
          },
          {
            title: 'Challenge B',
            desc: 'Ab in die Natur...'
          }
        ]
      };
    },
    components:
    {
      ChallengeItem
    }
  };
</script>
