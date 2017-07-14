<template lang="pug">
  #hello.container
    prism(ref="codeblock", :language="language", :plugins="plugins", :use="middleware", :code="code")
    form.form
      .row
        .col-sm-6
          select.form-control(v-model="language")
            option(v-for="lang in languages", :value="lang", v-text="lang")
      .row
        .col-sm-12
          textarea.form-control(v-model="code")
</template>

<script type="text/babel">
  import Prism from './Prism'
  export default {
    name: 'hello',
    components: {
      Prism
    },
    methods: {
      middleware (Prism, vm) {
        this.prism = Prism
        this.pvm = vm
      },
      rerender () {
        setTimeout(() => {
          this.pvm.render()
        })
      }
    },
    data () {
      return {
        pvm: null,
        prism: null,
        code: 'npm install vue-prismjs',
        language: 'bash',
        plugins: ['command-line'],
        languages: ['abap', 'actionscript', 'ada', 'apacheconf', 'apl', 'applescript', 'asciidoc', 'aspnet', 'autohotkey', 'autoit', 'bash', 'basic', 'batch', 'bison', 'brainfuck', 'bro', 'c', 'clike', 'coffeescript', 'core', 'cpp', 'crystal', 'csharp', 'css-extras', 'css', 'd', 'dart', 'diff', 'docker', 'eiffel', 'elixir', 'erlang', 'fortran', 'fsharp', 'gherkin', 'git', 'glsl', 'go', 'graphql', 'groovy', 'haml', 'handlebars', 'haskell', 'haxe', 'http', 'icon', 'inform7', 'ini', 'j', 'jade', 'java', 'javascript', 'jolie', 'json', 'jsx', 'julia', 'keyman', 'kotlin', 'latex', 'less', 'livescript', 'lolcode', 'lua', 'makefile', 'markdown', 'markup', 'matlab', 'mel', 'mizar', 'monkey', 'nasm', 'nginx', 'nim', 'nix', 'nsis', 'objectivec', 'ocaml', 'oz', 'parigp', 'parser', 'pascal', 'perl', 'php-extras', 'php', 'powershell', 'processing', 'prolog', 'properties', 'protobuf', 'puppet', 'pure', 'python', 'q', 'qore', 'r', 'reason', 'rest', 'rip', 'roboconf', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'smalltalk', 'smarty', 'sql', 'stylus', 'swift', 'tcl', 'textile', 'twig', 'typescript', 'verilog', 'vhdl', 'vim', 'wiki', 'xojo', 'yaml'],
        pluginModules: [
          'autolinker',
          'autoloader',
          'command-line',
          'copy-to-clipboard',
          'custom-class',
          'data-uri-highlight',
          'file-highlight',
          'highlight-keywords',
          'ie8',
          'jsonp-highlight',
          'keep-markup',
          'line-highlight',
          'line-numbers',
          'normalize-whitespace',
          'previewer-angle',
          'previewer-base',
          'previewer-color',
          'previewer-easing',
          'previewer-gradient',
          'previewer-time',
          'remove-initial-line-feed',
          'show-invisibles',
          'show-language',
          'toolbar',
          'unescaped-markup',
          'wpd'
        ]
      }
    },
    watch: {
      code () {
        this.rerender()
      },
      language () {
        this.rerender()
      },
      plugins () {
        this.rerender()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
