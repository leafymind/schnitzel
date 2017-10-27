<div class="container">
  {{#if answer.prefix}}
    <span class="prefix">{{answer.prefix}}</span>
  {{/if}}
  <span ref:input class="input" contenteditable="true" placeholder="{{answer.placeholder}}" on:keydown="onKeyDown(event)" on:input="onInput(event)"></span>
  {{#if answer.suffix}}
    <span class="suffix">{{answer.suffix}}</span>
  {{/if}}
</div>

<style>
  .container
  {
    display: flex;
  }

  .input
  {
    flex: 1;
    outline: 0;
    white-space: nowrap;
  }

  .input:empty:not([placeholder=""])::before
  {
    content: attr(placeholder);
    position: absolute;
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
      onKeyDown(event)
      {
        if (event.keyCode === 13)
        {
          event.preventDefault();
          this.fire('enter');
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
