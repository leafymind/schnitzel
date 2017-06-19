<div class="mdl-card mdl-shadow--2dp challenge-item" on:longpress="del(challenge)">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">{{challenge.title}}</h2>
  </div>
  <!-- <div class="mdl-card__supporting-text">{{challenge.desc}}</div> -->
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored" on:tap="open(challenge)">
      Challenge starten
    </a>
  </div>
  <div class="mdl-card__menu">
    {{#if supportsShare}}
    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" on:tap="share(challenge, link)">
      <i class="material-icons">share</i>
    </button>
    {{/if}}
  </div>
</div>

<style>
  .mdl-card.challenge-item
  {
    margin-bottom: 1rem;
  }

  .mdl-card__title
  {
    color: #fff;
    height: 120px;
    background: url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover;
    text-shadow: 2px 2px 3px #000;
  }

  .mdl-card__menu
  {
    color: #fff;
  }
</style>

<script>
  import { tap, longpress } from '../../../../../shared/component-events';
  import { stateRouter } from '../../../../../shared/Router';
  import DB from '../../../../../shared/DB';

  export default
  {
    events: { tap, longpress },
    data()
    {
      return { supportsShare: 'share' in navigator };
    },
    methods:
    {
      open(challenge)
      {
        stateRouter.go('app.play', { id: challenge._id });
      },

      del(challenge)
      {
        // TODO: only for testing, should be flagged as deleted later
        DB.local.challenges.remove(challenge)
          .catch(console.error.bind())
          .then(() =>
          {
            console.log('Gelöscht!');
            // TODO Reload state
          })
        ;
      },

      share(challenge, url)
      {
        const shareObj =
        {
          title: challenge.title,
          text: challenge.desc,
          url
        };

        // TODO: register for Origin Trail https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md
        navigator.share(shareObj)
          .then(console.error.bind())
          .catch(console.log.bind())
        ;
      }
    }
  }
</script>
