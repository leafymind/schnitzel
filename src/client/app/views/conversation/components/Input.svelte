<div class="input">
  <div class="field">
    <slot name="field">
      <div class="mdl-color-text--grey">Auf Antwort warten...</div>
    </slot>
  </div>
  <slot name="button">
    <button class="mdl-button mdl-button--icon mdl-color-text--accent" on:click="fire('fastforward')">
      <i class="material-icons">fast_forward</i>
    </button>
    <button disabled class="mdl-button mdl-button--icon">
      <i class="material-icons">send</i>
    </button>
  </slot>
</div>

<style>
  .input
  {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, .3);
  }

  .input > .field
  {
    flex: 1;
  }
</style>
