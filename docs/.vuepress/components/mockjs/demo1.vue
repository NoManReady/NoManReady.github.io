<template>
  <div class="mockjs-demo1 box">
    <a v-show="users.length" href="javascript:;" @click="isShow=!isShow">{{isShow?'收起':'展开'}}</a>
    <div class="tool mt10">
      <button class="mr10 btn" :class="{'active':active==='MockAdapter'}" @click="_mockAdapter">MockAdapter</button>
      <button class="mr10 btn" :class="{'active':active==='MockjsBase'}" @click="_mockjsBase">MockjsBase</button>
      <button class="mr10 btn" :class="{'active':active==='EasyMock'}" @click="_easyMock">EasyMock</button>
      <p class="mt10">
        <small style="color:#a00">(切换MockAdapter时axios将被全部接管，需刷新页面进行其他demo的查看)</small>
      </p>
    </div>
    <table v-show="isShow&&users.length">
      <thead>
        <tr>
          <th>VER</th>
          <th>ID</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Age</th>
          <th>Avatar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users">
          <td>{{u.ver}}</td>
          <td>{{u.id}}</td>
          <td>{{u.name}}</td>
          <td>{{u.sex}}</td>
          <td>{{u.age}}</td>
          <td><img :src="u.avatar" alt=""></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Axios from 'axios'
import fetch from '../../utils/fetch'
const PROJECTID = '59dec7acc09842759ae666da'
export default {
  name: 'mockjs-demo1',
  data() {
    return {
      users: [],
      isShow: true,
      active: ''
    }
  },
  methods: {
    _mockAdapter() {
      this.active = 'MockAdapter'
      fetch('/users', {}, { mockAdapter: true }).then(d => {
        this.users = Object.freeze(d.list)
      })
    },
    _mockjsBase() {
      this.active = 'MockjsBase'
      fetch('/users', {}, { baseURL: '/', mockjsBase: true }).then(d => {
        this.users = Object.freeze(d.list)
      })
      // 测试多host，请求github/sers接口
      // fetch('/users').then(d => {
      //   // console.log(d)
      // })
    },
    _easyMock() {
      this.active = 'EasyMock'
      fetch(
        '/users',
        {},
        {
          baseURL: `https://www.easy-mock.com/mock/${PROJECTID}/mock`
        }
      ).then(d => {
        this.users = Object.freeze(d.list)
      })
    }
  }
}
</script>
<style lang="stylus">
</style>