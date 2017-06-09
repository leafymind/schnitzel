<div ref:layout class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header ref:header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">{{viewTitle}}</span>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">{{appTitle}}</span>
    <nav class="mdl-navigation" on:click="refs.layout.MaterialLayout.toggleDrawer()">
      <a class="mdl-navigation__link" href="{{ asr.makePath('app.overview') }}">Overview</a>
      <a class="mdl-navigation__link" href="{{ asr.makePath('app.create') }}">Create</a>
    </nav>
  </div>
  <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button">
    <i class="material-icons">menu</i>
  </div>
  <div class="mdl-layout__content">
    <uiView class="page-content"></uiView>
  </div>
</div>

<style>
  .mdl-layout__header--transparent
  {
    position: absolute;
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

  export default
  {
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
      });
    }
  }
</script>
