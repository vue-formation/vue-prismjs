# vue-prismjs

Another Prism.js component for Vue.js. This component will dynamically 
register un-registered languages and plugins when specified. It also provides
a middleware hook for setting up plugins. This component has only been tested
in a webpack setting.

### Example

```js
<template>
  <div>
    <prism language="bash" :plugins="['command-line']", :code="code"></prism>
  </div>
</template>

<script>
  import Prism from 'vue-prismjs'
  import 'prismjs/themes/prism.css'
  
  export default {
    components: {
      Prism
    },
    data () {
      code: 'npm install vue-prismjs --save'
    }
  }
</script>
```

### Example with slot

```js
<template>
  <div>
    <prism language="markup">
      <h1>Foo</h1>
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
* `code` {String} - code string. Required (previous version allowed slot, this has been deprecated).
* `use` {Function} - a middleware function that allows you to interact with Prism and the vm before the code is rendered. The function has a signature of `function (Prism, vm) {}`. Optional
* `pre-render` {Function} - Processes the code before rendering. The function has a signature of `function (code, vm) {}` and the output is used as the code text. By default this applies the following code to remove `data-v-*` from the code `code.replace(/\s+data-v-\S+="[^"]*"/g, '')`

### Notes

* ~~Usage of the code slot has been deprecated. You must now use the code property. This was due to issues with markup in slots having extra properties added by vue itself.~~
* Slots are back by popular demand. A pre-render function option is not available to filter out unwanted data added by vue.