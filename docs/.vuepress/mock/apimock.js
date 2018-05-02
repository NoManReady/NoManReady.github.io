import Mock from 'mockjs'
import * as mockData from './mockData'
// Mock.setup({
//   timeout:'500-1000'
// })
export default () => {
  Mock.mock('/users', 'get', options => mockData.usersMockjs('mockjsBase'))
}
