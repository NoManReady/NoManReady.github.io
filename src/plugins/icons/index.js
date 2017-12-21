import Icon from './Icon'

const requestAll = requestContext => requestContext.keys().map(requestContext)
const ICON_PATH = '@/assets/icons'

export default {
    install(Vue, options = { path: ICON_PATH }) {
        Vue.component(Icon.name, Icon)
        requestAll(require.context('@/assets/icons', true, /\.svg$/))
    }
}