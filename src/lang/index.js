import { deCentralizationUmd } from '@/utils'

const en = deCentralizationUmd(require.context('./', true, /\.\/en\/\w+\.js/))
const zh = deCentralizationUmd(require.context('./', true, /\.\/zh\/\w+\.js/))

export default {
  en,
  zh
}
