<template lang="pug">
  pre(ref="pre", :class="preClass")
    code(ref="code", :class="codeClass")
      slot
</template>

<script type="text/babel">
  import Prism from 'prismjs'

  const plugins = {
    'autolinker': {
      path: 'prismjs/plugins/autolinker/prism-autolinker',
      css: 'prismjs/plugins/autolinker/prism-autolinker.css'
    },
    'autoloader': {
      path: 'prismjs/plugins/autoloader/prism-autoloader'
    },
    'command-line': {
      path: 'prismjs/plugins/command-line/prism-command-line',
      css: 'prismjs/plugins/command-line/prism-command-line.css'
    }
  }

  export default {
    props: {
      language: {
        type: String,
        default: 'javascript'
      },
      theme: {
        type: String,
        default: 'default'
      },
      plugins: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      preClass () {
        return {
          'command-line': this.hasPlugin('command-line')
        }
      },
      codeClass () {
        return {
          [`language-${this.language}`]: true
        }
      }
    },
    created () {
      if (!Prism.languages[this.language]) {
        require(`prismjs/components/prism-${this.language}`)
      }

      this.theme === 'default'
        ? require('prismjs/themes/prism.css')
        : require(`prismjs/themes/prism-${this.theme}.css`)

      this.plugins.forEach(plugin => {
        let p = plugins[plugin] || {}
        if (p.path) require(`prismjs/plugins/${plugin}/prism-${plugin}`)
        if (p.css) require(`prismjs/plugins/${plugin}/prism-${plugin}.css`)
      })
    },
    methods: {
      hasPlugin (plugin) {
        return this.plugins.indexOf(plugin) !== -1
      }
    },
    mounted () {
      Prism.highlightElement(this.$refs.code)
    }
  }
</script>
