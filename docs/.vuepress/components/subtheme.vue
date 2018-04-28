<template>
  <section class="sub-theme" v-if="userInfo">
    <div class="hero">
      <img class="avatar" :src="userInfo.avatar_url" alt="avatar">
      <div class="desc">
        <h4 class="nickname" @click="_goGithub">{{userInfo.name}}</h4>
        <p class="bio">{{userInfo.bio}}</p>
      </div>
      <div class="flex-box item">
        <div class="flex-box-item">
          <span>following</span>
          <a href="javascript:;">{{userInfo.following}}</a>
        </div>
        <div class="flex-box-item">
          <span>followers</span>
          <a href="javascript:;">{{userInfo.followers}}</a>
        </div>
        <div class="flex-box-item">
          <span>repos</span>
          <a href="javascript:;">{{userInfo.public_repos}}</a>
        </div>
      </div>
    </div>
    <div class="following box">
      <h4 class="box-title c-theme">Following</h4>
      <div class="box-content">
        <ul class="users clearfix">
          <li v-for="follow in following" :key="follow.id">
            <a :href="follow.html_url" class="user-item clearfix">
              <img :src="follow.avatar_url" :alt="follow.login" class="avatar">
              <div class="desc">
                <span class="overflow">{{follow.login}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
                  <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
                  <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
                </svg>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="followers box">
      <h4 class="box-title c-theme">Followers</h4>
      <div class="box-content">
        <ul class="users clearfix">
          <li v-for="follow in followers" :key="follow.id">
            <a :href="follow.html_url" class="user-item clearfix">
              <img :src="follow.avatar_url" :alt="follow.login" class="avatar">
              <div class="desc">
                <span class="overflow">{{follow.login}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
                  <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path>
                  <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
                </svg>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import fetch from '../utils/fetch'
export default {
  name: 'sub-theme',
  data() {
    return {
      userInfo: null,
      following: [],
      followers: []
    }
  },
  created() {
    this._loadUserInfo()
    this._loadFollowing()
    this._loadFollowers()
  },
  methods: {
    // 获取用户信息
    _loadUserInfo() {
      fetch('/users/nomanready').then(d => {
        this.userInfo = Object.freeze(d)
      })
    },
    // 加载following
    _loadFollowing() {
      fetch('/users/nomanready/following').then(d => {
        this.following = Object.freeze(d)
      })
    },
    // 加载followers
    _loadFollowers() {
      fetch('/users/nomanready/followers').then(d => {
        this.followers = Object.freeze(d)
      })
    },
    // 跳转github
    _goGithub() {
      window.open(this.userInfo.html_url, '_blank')
    }
  }
}
</script>
<style lang="stylus">
@import '../style/variable'
.sub-theme
  padding 3rem 6rem
  .hero
    text-align center
    border 1px solid $borderColor
    border-radius 3px
    padding 1rem
    width 16rem
    margin 0 auto
    .flex-box-item
      position relative
      &:not(:last-child):after
        position absolute
        display block
        height 80%
        vertical-align middle
        background $borderColor
        width 1px
        content ''
        right 0
        top 50%
        transform translateY(-50%)
    span
      display block
      margin-bottom 0.2rem
    a
      color $accentColor
  .desc
    margin 0.5em 0
    .nickname
      font-size 1rem
      cursor pointer
      &:hover
        color darken($accentColor, 20%)
    .bio
      font-size 0.8rem
      text-align right
      color lighten($textColor, 20%)
  .avatar
    width 5rem
    border-radius 50%
  .users
    .user-item
      text-align center
      text-align left
      font-size 0
      display block
      .desc
        padding 0.5rem
        display block
        span
          font-size 13px
          display inline-block
          width 70%
      .avatar
        width 3rem
        border-radius 50%
    li
      float left
      list-style none
      margin-bottom 1rem
      width 33%
@media (max-width: $MQMobile)
  .sub-theme
    padding 1rem
    .users
      li
        width 50%
</style>