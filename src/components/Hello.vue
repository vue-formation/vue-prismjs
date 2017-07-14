<template lang="pug">
  #hello.container
    prism(ref="codeblock", :language="language", :plugins="plugins", :use="middleware", :code="code")
    form
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
        plugins: ['command-line']
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
