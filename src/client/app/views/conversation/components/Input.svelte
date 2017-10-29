<div class="input">
  <div class="field">
    <slot name="field">
      <div class="mdl-color-text--grey">Antwort auswählen</div>
    </slot>
  </div>
  <slot name="button">
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
