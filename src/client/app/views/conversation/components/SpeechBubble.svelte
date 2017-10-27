<div class="speech-bubble {{class}}">
  <div class="arrow {{arrowClass}}"></div>
  <div class="content {{contentClass}}">
    <slot></slot>
    <div class="wave">
      <span class="dot mdl-color--primary"></span>
      <span class="dot mdl-color--primary"></span>
      <span class="dot mdl-color--primary"></span>
    </div>
  </div>
</div>

<style>
  .speech-bubble
  {
    display: flex;
    align-items: flex-start;
    margin-bottom: .75rem;
    max-width: 90%;
  }

  .speech-bubble .content
  {
    padding: .75rem 1rem;
    background-color: #fff;
    border-radius: 10px;
  }

  .speech-bubble:not(.typing) .content
  {
    white-space: pre-line;
  }

  .speech-bubble .arrow
  {
    color: #fff;
    border: 4px solid currentColor;
  }

  .speech-bubble .wave
  {
    position: relative;
    display: none;
    width: 40px;
  }

  .speech-bubble .dot
  {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 2px;
    animation: wave 1.3s linear infinite;

    &:nth-child(2)
    {
      animation-delay: -1.1s;
    }

    &:nth-child(3)
    {
      animation-delay: -0.9s;
    }
  }

  .speech-bubble.left .content
  {
    border-top-left-radius: 0;
  }

  .speech-bubble.left .arrow
  {
    border-left: 4px outset transparent;
    border-bottom: 4px outset transparent;
  }

  .speech-bubble.right
  {
    flex-direction: row-reverse;
    margin-left: auto;
  }

  .speech-bubble.right .content
  {
    border-bottom-right-radius: 0;
  }

  .speech-bubble.right .arrow
  {
    align-self: flex-end;
    border-right: 4px outset transparent;
    border-top: 4px outset transparent;
  }

  .speech-bubble.typing .wave
  {
    display: block;
  }

  @keyframes wave
  {
  	0%, 60%, 100%
    {
  		transform: translateY(5px);
  	}

  	30%
    {
  		transform: translateY(-10px);
  	}
  }
</style>

<script>
  export default
  {
    data()
    {
      return { class: '', arrowClass: '', contentClass: '' };
    }
  }
</script>
