<div class="mdl-js-layout {{css(mdl.layout, mdl.layoutFixedHeader)}}">
  <header class="{{mdl.layoutHeader}}">
    <div class="{{mdl.layoutHeaderRow}}">
      <span class="{{mdl.layoutTitle}}">Schnitzel</span>
      <div class="{{mdl.layoutSpacer}}"></div>
      <nav class="{{css(mdl.navigation, mdl.layoutLargeScreenOnly)}}">
        <a class="{{mdl.navigationLink}}" href="{{ asr.makePath('app.overview') }}">Overview</a>
        <a class="{{mdl.navigationLink}}" href="{{ asr.makePath('app.create') }}">Create</a>
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
  <div aria-expanded="false" role="button" tabindex="0" class="{{mdl.layoutDrawerButton}}">
    <i class="material-icons">menu</i>
  </div>
  <div class="{{mdl.layoutContent}}">
    <uiView class="page-content"></uiView>
  </div>
</div>


<!-- <style>
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
</style> -->

<script>
  import mdl from 'material-design-lite/dist/material.deep_purple-purple.min.css';

  export default
  {
    data()
    {
      return { mdl };
    },

    helpers:
    {
      css: (...classes) => classes.join(' ')
    }
  }
</script>
