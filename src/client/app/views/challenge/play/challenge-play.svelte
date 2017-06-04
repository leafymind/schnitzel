<div class="mdl-card">
  <div class="mdl-card__title cover">
    <h2 class="mdl-card__title-text">{{challenge.title}}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    <pre>{{json(challenge)}}</pre>
  </div>

  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text" ref:distance>
      {{distance.toFixed(3)}}
    </h2>
  </div>

  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">Quests</h2>
  </div>
  <ul class="mdl-list">
    {{#each quests as quest}}
    <li class="mdl-list__item">
      <span class="mdl-list__item-primary-content">
        {{quest.caption}}
      </span>
      <span class="mdl-list__item-secondary-action">
        <button class="mdl-button mdl-button--colored" on:tap="checkGeoLocation(quest)">Check</button>
      </span>
    </li>
    {{/each}}
  </ul>
  <div class="mdl-card__supporting-text">
    <pre>{{json(quests)}}</pre>
  </div>

  <div class="mdl-card__supporting-text">
    <pre>{{json(currentCoords)}}</pre>
  </div>
</div>

<style>
  .mdl-card__title.cover
  {
    color: #fff;
    height: 120px;
    background: url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover;
    text-shadow: 2px 2px 3px #000;
  }

  pre
  {
    margin: 0
  }
</style>

<script>
  import DB from '../../../shared/DB.js';
  import { tap } from '../../../shared/component-events.js';
  import { Distance } from '../../../shared/Distance.class.js';

  export default {
    events: { tap },

    oncreate()
    {
      console.log(this.get('challenge')._id);

      DB.quests.find({ selector: { challenge: this.get('challenge')._id } })
        .then(result =>
        {
          this.set({ quests: result.docs });
        })
      ;
    },

    data: () =>
    ({
      distance: 0,
      quests: []
    }),

    helpers:
    {
      json(obj)
      {
        return JSON.stringify(obj, null, 2);
      }
    },

    methods:
    {
      checkGeoLocation(quest)
      {
        navigator.geolocation.getCurrentPosition(position =>
        {
          console.log(position.coords);

          let distance = new Distance(quest.coords, position.coords);

          this.set
          ({
            distance,
            currentCoords:
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            }
          });

          this.refs.distance.style.color = (distance < 0.05 ? 'green' : 'red');

        }, console.error.bind(console), { enableHighAccuracy: true });
      }
    }
  };
</script>
