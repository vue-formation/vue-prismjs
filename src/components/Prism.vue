<template lang="pug">
  pre(ref="pre", :class="preClass")
    code(ref="code", :class="codeClass")
      | {{code}}
      slot(ref="codeslot", v-if="!code")
</template>

<script type="text/babel">
  import Prism from 'prismjs'

  const plugins = {
    'autolinker': { css: true },
    'autoloader': {},
    'command-line': { css: true },
    'copy-to-clipboard': {},
    'custom-class': {},
    'data-uri-highlight': {},
    'file-highlight': {},
    'highlight-keywords': {},
    'ie8': { css: true },
    'jsonp-highlight': {},
    'keep-markup': {},
    'line-highlight': { css: true },
    'line-numbers': { css: true },
    'normalize-whitespace': {},
    'previewer-angle': { css: true },
    'previewer-base': { css: true },
    'previewer-color': { css: true },
    'previewer-easing': { css: true },
    'previewer-gradient': { css: true },
    'previewer-time': { css: true },
    'remove-initial-line-feed': {},
    'show-invisibles': { css: true },
    'show-language': {},
    'toolbar': { css: true },
    'unescaped-markup': { css: true },
    'wpd': { css: true }
  }

  export default {
    props: {
      language: {
        type: String,
        default: 'javascript'
      },
      plugins: {
        type: Array,
        default () {
          return []
        }
      },
      use: {
        type: Function,
        default () {
          return true
        }
      },
      code: {
        type: String
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

      this.plugins.forEach(plugin => {
        let p = plugins[plugin] || {}
        if (p) require(`prismjs/plugins/${plugin}/prism-${plugin}`)
        if (p.css) require(`prismjs/plugins/${plugin}/prism-${plugin}.css`)
      })

      this.use(Prism, this)
    },
    methods: {
      render () {
        this.codeText = this.code || this.$refs.pre.innerText
        this.$refs.pre.firstChild.innerHTML = this.codeText
        Prism.highlightElement(this.$refs.pre.firstChild)
      },
      hasPlugin (plugin) {
        return this.plugins.indexOf(plugin) !== -1
      }
    },
    mounted () {
      this.render()
    },
    data () {
      return {
        codeText: null
      }
    }
  }
</script>
