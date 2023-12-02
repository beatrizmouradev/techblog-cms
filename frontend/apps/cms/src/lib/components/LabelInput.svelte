<script>
  export let label = ''
  export let value = ''
  const inputId = Math.random().toString(36).slice(2, 8);

</script>

<div>
  <label
    for={inputId}
  >
    { label }
  </label>

  <input
    {...$$props}
    bind:value
    on:input
    on:focus
    on:blur
  />
</div>

<style scoped>
  :root {
    --theme-color-bg-input: #fff;
    --theme-color-primary: rgb(26,115,232);
    --theme-color-fg-primary: rgba(0,0,0,0.87);
    --theme-color-fg-secondary: rgba(0,0,0,0.55);
    --theme-color-fg-default-border: rgba(0, 0, 0, 0.12);
  }
  label {
    color: var(--theme-color-fg-secondary);
    display: block;
    font-size: 13px;
    padding-bottom: 8px
  }
  input {
    border: transparent;
    outline: 2px solid transparent;
    background: var(--theme-color-bg-input);
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--theme-color-fg-primary);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    max-width: 100%;
    padding: 8px;
    -webkit-transition: box-shadow .15s;
    transition: box-shadow .15s;
    vertical-align: middle;
    -webkit-appearance: none;
    box-shadow: 0 0 0 2px transparent inset,0 0 0 1px var(--theme-color-fg-default-border) inset;
    max-height: 36px;
    width: fill-available
  }
  input:focus {
    box-shadow: 0 0 0 2px var(--theme-color-primary) inset,0 0 0 1px var(--theme-color-fg-default-border) inset;
  }
</style>
