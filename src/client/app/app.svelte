<div ref:layout on:swipeLeft="toggleDrawer(false)" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header ref:header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">{{viewTitle}}</span>
    </div>
  </header>
  <div class="mdl-layout__drawer mdl-shadow--16dp">
    <div class="mdl-card mdl-shadow--2dp drawer-profile">
      <div class="mdl-card__title mdl-card--expand">
        <img src="../assets/img/avatar.jpg" alt="avatar" />
      </div>
      <div class="mdl-card__actions" on:tap="toggleUserMenu(usermenu)">
        Annonymer Schnitzeljäger
        <div class="mdl-layout-spacer"></div>
        <i class="material-icons">{{#if usermenu}}arrow_drop_up{{else}}arrow_drop_down{{/if}}</i>
      </div>
    </div>
    <nav class="mdl-navigation">
      {{#if usermenu}}
      <a class="mdl-navigation__link" on:tap="go('app.login')">Anmelden</a>
      {{else}}
      <a class="mdl-navigation__link" on:tap="go('app.overview')">Übersicht</a>
      <a class="mdl-navigation__link" on:tap="go('app.create')">Neue Challenge</a>
      {{/if}}
    </nav>
  </div>
  <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button">
    <i class="material-icons">menu</i>
  </div>
  <div class="mdl-layout__content" on:swipeRight="toggleDrawer(true)">
    <uiView class="page-content"></uiView>
  </div>
</div>

<style>
  .mdl-layout
  {
    background-color: #e5e5e5;
  }

  .mdl-layout__header--absolute
  {
    position: absolute;
  }

  .mdl-layout__drawer
  {
    border-right: 0;
    width: 80vw;
    max-width: 300px;
  }

  .mdl-layout__drawer:not(.is-visible)
  {
    transform: translateX(calc(-100% - 16px));
  }

  .drawer-profile
  {
    background: linear-gradient(0deg, rgba(#333, .75), rgba(#333, .75)), url(http://ecx.images-amazon.com/images/I/71bLXSC0FZL._SX355_.jpg) 50% / cover;
    border-radius: 0
  }

  .drawer-profile img
  {
    border-radius: 50%;
    max-width: 60px;
  }

  .drawer-profile .mdl-card__actions
  {
    display: flex;
    box-sizing:border-box;
    align-items: center;
    color: #fff;
    padding: 1rem;
  }

  .mdl-card
  {
    width: auto;
    min-height: 100px;
  }

  .mdl-list
  {
    margin: 0;
  }

  .content
  {
    padding: 1rem;
  }
</style>

<script>
  import Header from './shared/Header.service';
  import { stateRouter } from './shared/Router';
  import { tap, swipeRight, swipeLeft } from './shared/component-events';

  export default
  {
    events: { tap, swipeRight, swipeLeft },

    data: () =>
    ({
      appTitle: 'Schnitzel',
      viewTitle: 'Schnitzel'
    }),

    oncreate()
    {
      Header.on('transparent', isTransparent =>
      {
        this.refs.header.classList.toggle('mdl-layout__header--transparent', isTransparent);
        this.refs.header.classList.toggle('mdl-layout__header--absolute', isTransparent);
      });
    },

    methods:
    {
      go(stateName)
      {
        stateRouter.go(stateName);
        this.toggleDrawer(false);
      },

      toggleDrawer(isOpen)
      {
        const mdlLayout = this.refs.layout.MaterialLayout;

        if (mdlLayout.drawer_.classList.contains('is-visible') !== isOpen)
        {
          mdlLayout.toggleDrawer();
        }
      },

      toggleUserMenu(usermenu)
      {
        this.set({ usermenu: !usermenu });
      }
    }
  }
</script>
