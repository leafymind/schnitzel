<Input>
  <div slot="field">
    <div ref:text class="mdl-color-text--grey">{{answer.text}}</div>
  </div>
  <button slot="button" on:click="checkGeoLocation()" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
    <i class="material-icons">place</i>
  </button>
</Input>

<dialog ref:dialog class="mdl-dialog">
  <h4 class="mdl-dialog__title">Deine Position</h4>
  <div class="mdl-dialog__content">
    <div class="direction">
      <i class="material-icons mdl-color-text--accent" style="transform: rotate({{direction}}deg)">navigation</i>
    </div>

    {{#if distance}}
      <p>Du bist noch <b>{{distance}}</b> vom Ziel entfernt.</p>
    {{/if}}
  </div>
  <div class="mdl-dialog__actions">
    <button on:click="refs.dialog.close()" class="mdl-button mdl-js-button mdl-js-ripple-effect">Schließen</button>
  </div>
</dialog>

<style>
  .mdl-dialog__content
  {
    text-align: center;
  }

  .direction
  {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 20px;
  }

  .direction .material-icons
  {
    font-size: 3rem;
  }
</style>

<script>
  import { Distance } from '../../../shared/Distance.class';
  import Input from './Input';

  let geolocationWatchId;

  export default
  {
    components: { Input },

    data()
    {
      return { direction: 0 };
    },

    methods:
    {
      checkDistance(position)
      {
        const answer = this.get('answer');
        const distance = new Distance(answer.expect, position.coords);
        const reached = distance < answer.expect.tolerance / 1000;

        this.set
        ({
          distance: distance < 1 ? new Distance(distance * 1000, null, 'm').toFixed(0) : distance.toFixed(2),
          direction: Math.atan2(position.coords.latitude - answer.expect.latitude, position.coords.longitude - answer.expect.longitude) * 180 / Math.PI
        });

        if (reached)
        {
          this.refs.text.classList.remove('mdl-color-text--grey'); // TODO obsolete?

          if (this.refs.dialog.open)
          {
            this.refs.dialog.close();
          }

          this.fire('arrived', { position });
        }
        else if (!geolocationWatchId)
        {
          console.log('Start watching position');

          geolocationWatchId = navigator.geolocation.watchPosition
          (
            this.checkDistance.bind(this),
            console.error.bind(console),
            { enableHighAccuracy: true }
          );

          this.refs.dialog.showModal();
        }
      },

      checkGeoLocation()
      {
        navigator.geolocation.getCurrentPosition
        (
          this.checkDistance.bind(this),
          console.error.bind(console),
          { enableHighAccuracy: true }
        );
      }
    },

    oncreate()
    {
      this.refs.dialog.addEventListener('click', closeOnBackdropClick);
      this.refs.dialog.addEventListener('close', clearGeolocationWatch);
    },

    ondestroy()
    {
      this.refs.dialog.removeEventListener('click', closeOnBackdropClick);
      this.refs.dialog.removeEventListener('close', clearGeolocationWatch);
    }
  }

  function closeOnBackdropClick(event)
  {
    if (this === event.target)
    {
      const rect = this.getBoundingClientRect();
      const isInDialog = (event.clientY >= rect.top && rect.bottom >= event.clientY && event.clientX >= rect.left && rect.right >= event.clientX);

      if (!isInDialog)
      {
        this.close();
      }
    }
  }

  function clearGeolocationWatch()
  {
    console.log('Stop watching position');

    navigator.geolocation.clearWatch(geolocationWatchId);
    geolocationWatchId = null;
  }
</script>
