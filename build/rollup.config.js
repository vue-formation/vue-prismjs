import path from 'path'
import vue from 'rollup-plugin-vue'

export default {
  entry: path.resolve(__dirname, '../src/components/index.js'),
  dest: path.resolve(__dirname, '../vue-prismjs.js'),
  external: ['vue', 'prismjs'],
  format: 'cjs',
  plugins: [
    vue()
  ]
}