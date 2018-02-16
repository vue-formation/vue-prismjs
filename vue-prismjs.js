'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var Prism = _interopDefault(require('prismjs'));

var plugins = {
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
};

var Prism$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('pre', { ref: "pre", class: _vm.preClass }, [_c('code', { ref: "code", class: _vm.codeClass }, [_vm._v(_vm._s(_vm.code))])]);
  }, staticRenderFns: [],
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    use: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    preClass: function preClass() {
      return {
        'command-line': this.hasPlugin('command-line')
      };
    },
    codeClass: function codeClass() {
      return _defineProperty({}, 'language-' + this.language, true);
    }
  },
  created: function created() {
    if (!Prism.languages[this.language]) {
      require('prismjs/components/prism-' + this.language);
    }

    this.plugins.forEach(function (plugin) {
      var p = plugins[plugin] || {};
      if (p) require('prismjs/plugins/' + plugin + '/prism-' + plugin);
      if (p.css) require('prismjs/plugins/' + plugin + '/prism-' + plugin + '.css');
    });

    this.use(Prism, this);
  },

  methods: {
    render: function render() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs.code.innerText = _this.code;
        Prism.highlightElement(_this.$refs.code);
      });
    },
    hasPlugin: function hasPlugin(plugin) {
      return this.plugins.indexOf(plugin) !== -1;
    }
  },
  mounted: function mounted() {
    this.render();
  },

  watch: {
    code: function code() {
      this.render();
    },
    language: function language() {
      this.render();
    },
    plugins: function plugins() {
      this.render();
    }
  }
};

/**
 * @name vue-prismjs
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Prismjs component for Vue.js
 */

module.exports = Prism$2;
