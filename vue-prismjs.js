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
};

var Prism$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('pre', { ref: "pre", class: _vm.preClass }, [_c('code', { ref: "code", class: _vm.codeClass }, [_vm._t("default")], 2)]);
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
      default: ''
    },
    preRender: {
      type: Function,
      default: function _default(code) {
        return code.replace(/\s+data-v-\S+="[^"]*"/g, '');
      }
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
  methods: {
    render: function render() {
      var _this = this;

      if (!Prism.languages[this.language]) {
        require('prismjs/components/prism-' + this.language);
      }

      var pluginCount = 0;
      this.plugins.forEach(function (plugin) {
        if (_this._loadedPlugins[plugin]) {
          return true;
        }
        var p = plugins[plugin];
        if (p) {
          _this._loadedPlugins[plugin] = true;
          pluginCount++;
          require('prismjs/plugins/' + plugin + '/prism-' + plugin);
          if (p.css) {
            require('prismjs/plugins/' + plugin + '/prism-' + plugin + '.css');
          }
        }
      });
      if (pluginCount) {
        this.use(Prism, this);
      }

      // always update codetext to the code value
      // otherwise see if the text has already been obtained
      // otherwise obtain it from innerHTML
      this.codeText = this.code || this.codeText || this.$refs.code.innerHTML;
      this.$nextTick(function () {
        _this.$refs.code.textContent = _this.preRender(_this.codeText, _this);
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
  },
  data: function data() {
    return {
      codeText: '',
      _loadedPlugins: {}
    };
  }
};

/**
 * @name vue-prismjs
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Prismjs component for Vue.js
 */

module.exports = Prism$2;
