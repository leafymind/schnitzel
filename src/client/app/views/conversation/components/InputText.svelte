<span class="container">
  {{#if answer.prefix}}
    <span class="prefix">{{answer.prefix}}</span>
  {{/if}}
  <span ref:input class="input" contenteditable="true" placeholder="{{answer.placeholder}}" on:keydown="onKeyDown(event, answer)" on:input="onInput(event)"></span>
  {{#if answer.suffix}}
    <span class="suffix">{{answer.suffix}}</span>
  {{/if}}
</span>

<style>
  .input
  {
    display: inline-block;
    outline: 0;
    white-space: nowrap;
  }

  .input:empty:not([placeholder=""])::before
  {
    content: attr(placeholder);
    color: #999;
  }

  .input:empty[placeholder=""]::before
  {
    content: '...';
    color: #999;
  }

  .prefix,
  .suffix
  {
    white-space: pre;
  }

  .prefix::after,
  .suffix::before
  {
    content: ' ';
  }
</style>

<script>
  export default
  {
    methods:
    {
      onKeyDown(event, answer)
      {
        if (event.keyCode === 13)
        {
          event.preventDefault();

          if (!answer.expect || answer.expect.every(word => event.target.innerText.toLowerCase().includes(word)))
          {
            this.fire('enter');
          }
        }
      },

      onInput(event)
      {
        this.fire('input', { input: event.target.innerText });
      }
    },

    oncreate()
    {
      this.refs.input.focus();
    }
  };
</script>
