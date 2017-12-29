import { deCentralizationUmd } from '@/utils'
import store from '@/store'

const Err404 = r => require(['@/views/common/404'], r)
const Welcome = r => require(['@/views/common/Welcome'], r)
const Admin = r => require(['@/views/common/Admin'], r)

// 动态路由
export const dynamicRoutes = deCentralizationUmd(
  require.context('./', true, /\.\/dynamic\/\w+\.js/),
  (a, b) => [...a, ...b]
)

export const routes = [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/article',
    component: Admin,
    children: dynamicRoutes,
    meta: {
      auth: true,
      name: 'admin'
    }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome,
    meta: {
      auth: true,
      name: 'welcome',
      t: 'welcome'
    }
  },
  {
    path: '*',
    name: 'redirect',
    redirect: to => {
      if (store.state.init === 0) {
        return '/welcome'
      } else {
        return '/admin'
      }
    }
  }
]
