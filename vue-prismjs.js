'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Prism = _interopDefault(require('prismjs'));

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
};

var Prism$2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('pre',{ref:"pre",class:_vm.preClass},[_c('code',{ref:"code",class:_vm.codeClass},[_vm._t("default")],2)])},staticRenderFns: [],
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
      require(`prismjs/components/prism-${this.language}`);
    }

    this.theme === 'default'
      ? require('prismjs/themes/prism.css')
      : require(`prismjs/themes/prism-${this.theme}.css`);

    this.plugins.forEach(plugin => {
      let p = plugins[plugin] || {};
      if (p.path) require(`prismjs/plugins/${plugin}/prism-${plugin}`);
      if (p.css) require(`prismjs/plugins/${plugin}/prism-${plugin}.css`);
    });
  },
  methods: {
    hasPlugin (plugin) {
      return this.plugins.indexOf(plugin) !== -1
    }
  },
  mounted () {
    Prism.highlightElement(this.$refs.code);
  }
};

/**
 * @name vue-prismjs
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Prismjs component for Vue.js
 */

module.exports = Prism$2;
