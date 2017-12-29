const Article = r => require(['@/views/admin/Article'], r)
const Err404 = r => require(['@/views/common/404'], r)
export default [
  {
    path: 'article',
    name: 'article',
    component: Article,
    meta: {
      auth: true,
      name: 'article',
      t: 'nav.article'
    }
  },
  {
    path: '404',
    name: '404',
    component: Err404,
    meta: {
      auth: false,
      name: '404',
      t: 'common.404'
    }
  },
  {
    path: '*',
    name: 'redirect',
    redirect: '404'
  }
]
