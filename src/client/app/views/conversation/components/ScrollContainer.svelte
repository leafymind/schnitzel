<div class="scrollable invert">
  <div class="invert">
    <slot></slot>
  </div>
</div>

<style>
  .scrollable
  {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .invert
  {
    transform: scaleY(-1);
  }
</style>
