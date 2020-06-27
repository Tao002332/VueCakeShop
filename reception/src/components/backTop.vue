<template>
  <div v-show="isShowimg" title="回到顶部" class="comp-to-top" @click="goTop">
    TOP
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowimg: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    document.removeEventListener('scroll', this.handleScroll)
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  methods: {
    goTop () {
      // 回到顶部
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.isShowimg = false
    },
    handleScroll (e) {
      // 滚动操作监听
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      let offsetTop = 0
      try {
        offsetTop = document.querySelector('.main').offsetTop
      } catch (e) {
        offsetTop = 0
      }
      if (scrollTop > offsetTop) {
        // this.searchBarFixed = true
        // this.scrollStatus = {
        //   display: 'block',
        //   background: '#fff',
        //   h: this.statusBarHeight.h
        // }
        if (scrollTop > 100) {
          this.isShowimg = true
        } else {
          this.isShowimg = false
        }
      } else {
        // this.searchBarFixed = false
        this.isShowimg = false
        // this.scrollStatus = {
        //   display: 'none',
        //   background: 'transparent',
        //   h: 0
        // }
      }
    }
  }
}
</script>
<style scoped>
.comp-to-top {
  background-color: #4aa557;
  position: fixed;
  right: 60px;
  bottom: 60px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 100;
}
</style>
