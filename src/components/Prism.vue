<template lang="pug">
  pre(ref="pre", :class="preClass")
    code(ref="code", :class="codeClass")
      slot
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
    'ie8': { css: true, deprecated: true },
    'jsonp-highlight': {},
    'keep-markup': {},
    'line-highlight': { css: true },
    'line-numbers': { css: true },
    'normalize-whitespace': {},
    'previewers': { css: true },
    'previewer-angle': { css: true, deprecated: true },
    'previewer-base': { css: true, deprecated: true },
    'previewer-color': { css: true, deprecated: true },
    'previewer-easing': { css: true, deprecated: true },
    'previewer-gradient': { css: true, deprecated: true },
    'previewer-time': { css: true, deprecated: true },
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
        type: String,
        default: ''
      },
      preRender: {
        type: Function,
        default (code) {
          return code.replace(/\s+data-v-\S+="[^"]*"/g, '')
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
    methods: {
      render () {
        if (!Prism.languages[this.language]) {
          require(`prismjs/components/prism-${this.language}`)
        }

        let pluginCount = 0
        this.plugins.forEach(plugin => {
          if (this._loadedPlugins[plugin]) {
            return true
          }
          let p = plugins[plugin]
          if (p) {
            this._loadedPlugins[plugin] = true
            pluginCount++
            require(`prismjs/plugins/${plugin}/prism-${plugin}`)
            if (p.css) {
              require(`prismjs/plugins/${plugin}/prism-${plugin}.css`)
            }
          }
        })
        if (pluginCount) {
          this.use(Prism, this)
        }

        // always update codetext to the code value
        // otherwise see if the text has already been obtained
        // otherwise obtain it from innerHTML
        this.codeText = this.code || this.codeText || this.$refs.code.innerHTML
        this.$nextTick(() => {
          this.$refs.code.textContent = this.preRender(this.codeText, this)
          Prism.highlightElement(this.$refs.code)
        })
      },
      hasPlugin (plugin) {
        return this.plugins.indexOf(plugin) !== -1
      }
    },
    mounted () {
      this.render()
    },
    watch: {
      code () {
        this.render()
      },
      language () {
        this.render()
      },
      plugins () {
        this.render()
      }
    },
    data () {
      return {
        codeText: '',
        _loadedPlugins: {}
      }
    }
  }
</script>
