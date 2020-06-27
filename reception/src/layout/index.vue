<template>
  <div class="main">
    <div class="page-wrapper">
      <app-head/>
      <!--End Main Header -->
      <!--Main Slider-->
      <!--End Main Slider-->
      <router-view :key="$route.fullPath" />
      <!-- Main Footer -->
      <!-- End Footer -->
    </div>
    <backTop />
  </div>
</template>
<script>
import appHead from '@/layout/app-head'
import backTop from '@/components/backTop.vue'
export default {
  name: 'Layout',
  components: { appHead, backTop },
  data () {
    return {}
  }
}
</script>
