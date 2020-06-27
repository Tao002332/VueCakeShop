<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ admin_name }}</div>

    <el-button type="primary" style="margin-left: 16px;" @click="drawer = true">
      点我打开
    </el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <span>我来啦!</span>
    </el-drawer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters([
      'admin_name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
