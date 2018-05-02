import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as mockData from './mockData'
export default () => {
  let mock = new MockAdapter(Axios, { delayResponse: 500 })
  mock.onGet('/users').reply(config => {
    return [200, mockData.usersMockjs('mockjsAdapter')]
  })
}
