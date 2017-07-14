import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'

export default {
  entry: path.resolve(__dirname, '../src/components/index.js'),
  dest: path.resolve(__dirname, '../vue-prismjs.js'),
  external: ['vue', 'prismjs', 'babel-runtime/helpers/defineProperty'],
  format: 'cjs',
  plugins: [
    vue(),
    babel({ runtimeHelpers: true })
  ]
}