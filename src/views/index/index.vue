<template>
  <div class="main">
    <Bar></Bar>
    <Banner></Banner>
  </div>
</template>

<script>
import Bar from '@/components/bar/bar.vue'
import Banner from './components/banner.vue'
export default {
  components:{
    Bar,
    Banner
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  height: calc(100vh);
  position: relative;
}
</style>