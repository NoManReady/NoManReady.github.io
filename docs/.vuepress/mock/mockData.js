import Mock from 'mockjs'
const Random = Mock.Random
// 用户模拟接口数据
export const usersMockjs = ver => {
  return Mock.mock({
    'list|4-10': [
      {
        ver,
        name: '@cname',
        'age|15-30': 1,
        sex: Random.pick(['male', 'female']),
        id: '@id',
        avatar: "@image('88x31', '@color','@age')"
      }
    ]
  })
}
// 大数据测试
export const bigdata = ver => {
  return Mock.mock({
    'list|5000': [
      {
        name: '@first@last'
      }
    ]
  })
}
