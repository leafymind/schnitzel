<div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">{{title}}</h2>
  </div>
  <div class="mdl-card__supporting-text">{{desc}}</div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored" href="{{lenk}}">
      Challenge starten
    </a>
  </div>
  <div class="mdl-card__menu">
    <button class="mdl-button mdl-button--icon">
      <i class="material-icons">share</i>
    </button>
  </div>
</div>

<style>
  .demo-card-wide.mdl-card
  {
    width: 100%;
    max-width: 512px;
  }

  .demo-card-wide > .mdl-card__title
  {
    color: #fff;
    height: 176px;
    background: url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover;
  }

  .demo-card-wide > .mdl-card__menu
  {
    color: #fff;
  }
</style>
