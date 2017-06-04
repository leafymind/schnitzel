<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">Schnitzel</span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <nav class="mdl-navigation mdl-layout--large-screen-only">
      <a class="mdl-navigation__link" href="{{ asr.makePath('app.overview') }}">Overview</a>
      <a class="mdl-navigation__link" href="{{ asr.makePath('app.create') }}">Create</a>
      </nav>
    </div>
  </header>
  <!-- <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Title</span>
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
      <a class="mdl-navigation__link" href="">Link</a>
    </nav>
  </div> -->
  <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button">
    <i class="material-icons">menu</i>
  </div>
  <div class="mdl-layout__content">
    <uiView class="page-content"></uiView>
  </div>
</div>


<style>
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
