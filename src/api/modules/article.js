import fetch from '@/utils/fetch'
/**
 * 文章Md接口
 */
const PREFIX = '/static/mds'

/**
 * 获取文章
 */
export const getArticle = path => {
  return fetch(path, null, 'GET')
}
