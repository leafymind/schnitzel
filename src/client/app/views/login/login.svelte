<ul class="mdl-list">
  <li class="mdl-list__item">
    <div class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-icon">person</i>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="user" bind:value="user"
               autocorrect="off" autocapitalize="off" spellcheck="false" />
        <label class="mdl-textfield__label" for="user">Benutzername</label>
      </div>
    </div>
  </li>
  <li class="mdl-list__item">
    <div class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-icon">lock</i>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="password" id="pw" bind:value="pw" />
        <label class="mdl-textfield__label" for="pw">Password</label>
      </div>
    </div>
  </li>
</ul>

<div class="content">
  <button ref:loginBtn class="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect" on:tap="login(user, pw, returnTo)">Anmelden</button>
</div>

<style>
  .mdl-button
  {
    width: 100%;
  }
</style>

<script>
  import DB from '../../shared/DB';
  import { stateRouter } from '../../shared/Router';
  import { tap } from '../../shared/component-events';

  export default
  {
    events: { tap },

    data()
    {
      return {
        user: '',
        pw: ''
      };
    },

    methods:
    {
      login(user, pw, returnTo)
      {
        this.set({ loading: true });
        this.refs.loginBtn.disabled = true;

        DB.remote.challenges.login(user, pw)
          .then(result =>
          {
            console.log(result);
            this.set({ loading: false });
            this.refs.loginBtn.disabled = false;

            stateRouter.go(returnTo || 'app.overview', {}, { replace: true });
          })
          .catch(console.error.bind())
        ;
      }
    }
  }
</script>
