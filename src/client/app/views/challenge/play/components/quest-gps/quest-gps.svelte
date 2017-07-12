{{#if quest.coords}}
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text" style="display:none" ref:distance>
      {{distance.toFixed(3)}}
    </h2>
  </div>
  <div class="mdl-card__supporting-text">
    <pre>{{json(currentCoords)}}</pre>
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" on:tap="checkGeoLocation(quest)">Ich bin da</button>
  </div>
{{/if}}

<script>
  import { tap } from '../../../../../shared/component-events.js';
  import { Distance } from '../../../../../shared/Distance.class.js';

  export default
  {
    events: { tap },

    data: () => ({ distance: 0 }),

    helpers:
    {
      json(obj)
      {
        return JSON.stringify(obj, null, 2);
      }
    },

    oncreate()
    {
      navigator.geolocation.watchPosition(this.checkDistance.bind(this), console.error.bind(console));
    },

    methods:
    {
      checkDistance(position)
      {
        const quest = this.get('quest');
        const distance = new Distance(quest.coords, position.coords);
        const reached = distance < quest.coords.tolerance / 1000;

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

        this.refs.distance.style.color = (reached ? 'green' : 'red');

        if (reached)
        {
          this.fire('done');
        }
      },

      checkGeoLocation(quest)
      {
        navigator.geolocation.getCurrentPosition(this.checkDistance.bind(this), console.error.bind(console), { enableHighAccuracy: true });
        this.refs.distance.style.display = '';
      }
    }
  };
</script>
