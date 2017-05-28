<div class="content">
  <h5>Entfernung zu {{challenge.title}}</h5>

  <h3 ref:distance>
    {{distance}} km
  </h3>

  <div>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" on:tap="geolocation()">Test Standort</button>
  </div>

  <pre>{{json(challenge.coords)}}</pre>
  <pre>{{json(currentCoords)}}</pre>
</div>

<style>
  .content
  {
    padding: 1rem;
    text-align: center;
  }

  pre
  {
    text-align: left;
  }
</style>

<script>
  import { tap } from '../../../shared/component-events.js';
  import { getDistanceFromLatLonInKm } from '../../../shared/geo-location.js';
  import { challenges } from '../../../model/challenges.js';

  export default {
    events: { tap },

    data()
    {
      return { distance: 0 };
    },

    helpers:
    {
      json(obj)
      {
        return JSON.stringify(obj, null, 2);
      }
    },

    computed:
    {
      challenge: id => challenges.find(item => item.id == id)
    },

    methods:
    {
      geolocation()
      {
        navigator.geolocation.getCurrentPosition(position =>
        {
          console.log(position.coords);

          let distance = getDistanceFromLatLonInKm
          (
            this.get('challenge').coords.latitude,
            this.get('challenge').coords.longitude,
            position.coords.latitude,
            position.coords.longitude
          );

          distance = Math.round(distance * 1000) / 1000;

          console.log(distance);

          this.set
          ({
            distance,
            currentCoords:
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          this.refs.distance.style.color = (distance < 0.05 ? 'green' : 'red');
        }, { enableHighAccuracy: true });
      }
    }
  };
</script>
