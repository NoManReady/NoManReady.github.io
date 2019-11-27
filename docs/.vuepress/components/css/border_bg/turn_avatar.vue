<style lang="stylus" scoped>
main {
  width: 100%;
  height: 529px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.path {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 100px auto;
  position: relative;
  display: flex;
  border: 1px solid #b4a078;
}

.logo {
  width: 52px;
  margin: auto;
  background: #fff;
  border-radius: 50%;
}

.avatar {
  width: 50px;
  position: absolute;
  top: 124px;
  left: 124px;
  animation-play-state: running;
  animation: circular-smooth-spin 7.5s infinite linear;
}

.avatar > span {
  font-weight: 500;
  position: absolute;
  white-space: nowrap;
  top: -50%;
  left: 50%;
  padding: 3px 12px;
  opacity: 0;
  transform: scale(0);
  transition: opacity, transform 0.8s;
  transform-origin: 0 bottom;
}

.avatar > img {
  width: inherit;
  border-radius: 50%;
  overflow: hidden;
}

.path:hover .avatar {
  animation-play-state: paused;
}

.path:hover .avatar > span {
  opacity: 1;
  transform: scale(1);
  transition: opacity, transform 0.8s;
}

.avatar:nth-of-type(2) {
animation-delay: -1.5s;
}

.avatar:nth-of-type(3) {
animation-delay: -3s;
}

.avatar:nth-of-type(4) {
animation-delay: -4.5s;
}

.avatar:nth-of-type(5) {
animation-delay: -6s;
}
@keyframes circular-smooth-spin {
  from {
    transform: rotate(0turn) translateY(-124px) rotate(1turn);
  }

  to {
    opacity: 1;
    transform: rotate(1turn) translateY(-124px) rotate(0turn);
  }
}
</style>
<template>
  <main class="main">
    <div class="path">
      <img :src="png" class="logo" />
      <div class="avatar">
        <span>Evan You</span>
        <img :src="png" />
      </div>
      <div class="avatar">
        <span>Damian Dulisz</span>
        <img :src="png" />
      </div>
      <div class="avatar">
        <span>defcc</span>
        <img :src="png" />
      </div>
      <div class="avatar">
        <span>Edd Yerburgh</span>
        <img :src="png" />
      </div>
      <div class="avatar">
        <span>Sarah Drasner</span>
        <img :src="png" />
      </div>
      <div class="avatar">
        <span>Sarah Drasner</span>
        <img :src="png" />
      </div>
    </div>
  </main>
</template>
<script>
import png from '../../../assets/evan.jpeg'
export default {
  name: 'turn_avatar',
  data() {
    return {
      png
    }
  }
}
</script>