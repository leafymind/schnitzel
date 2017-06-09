<div class="{{css(mdl.card, mdl.shadow2dp)}}" on:longpress="del(challenge)">
  <div class="{{mdl.cardTitle}} challenge-card-bg">
    <h2 class="{{mdl.cardTitleText}}">{{challenge.title}}</h2>
  </div>
  <div class="{{css(mdl.cardActions, mdl.cardBorder)}}">
    <a class="mdl-js-button {{css(mdl.button, mdl.buttonColored)}}" on:tap="open(challenge)">
      Challenge starten
    </a>
  </div>
  <div class="{{mdl.cardMenu}} challenge-card-menu">
    {{#if supportsShare}}
    <button class="{{css(mdl.button, mdl.buttonIcon)}}" on:tap="share(challenge, link)">
      <i class="material-icons">share</i>
    </button>
    {{/if}}
  </div>
</div>

<style>
  .challenge-card-bg
  {
    color: #fff;
    height: 120px;
    background: url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover;
    text-shadow: 2px 2px 3px #000;
  }

  .challenge-card-menu
  {
    color: #fff;
  }
</style>

<script>
  import mdl from 'material-design-lite/dist/material.deep_purple-purple.min.css';
  import DB from '../../../../../shared/DB';
  import { tap, longpress } from '../../../../../shared/component-events';
  import { stateRouter } from '../../../../../shared/router';

  export default
  {
    events: { tap, longpress },

    data()
    {
      return { mdl, supportsShare: 'share' in navigator };
    },

    helpers:
    {
      css: (...classes) => classes.join(' ')
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
