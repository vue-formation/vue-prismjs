# vue-prismjs

Another Prism.js component for Vue.js. This component will dynamically 
register un-registered languages and plugins when specified. It also provides
a middleware hook for setting up plugins. This component has only been tested
in a webpack setting.

### Example

```js
<template>
  <div>
    <prism language="bash" :plugins="['command-line']">
      npm install vue-prismjs --save
    </prism>
  </div>
</template>

<script>
  import Prism from 'vue-prismjs'
  import 'prismjs/themes/prism.css'
  
  export default {
    components: {
      Prism
    }
  }
</script>
```

### Props

* `language` {String} - language component to use. Defaults to `javascript`
* `plugins` {Array} - array of plugin names. Optional
* `code` {String} - code string. This is required if no code was provided as a child/slot. This should be used for reactive code display.
* `use` {Function} - a middleware function that allows you to interact with Prism and the vm before the code is rendered. The function has a signature of `function (Prism, vm) {}`. Optional
