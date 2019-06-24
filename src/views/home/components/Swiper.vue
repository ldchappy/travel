<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "HomeSwiper",
  props : {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true
      }};
  },
  computed : {
    showSwiper () {
      return this.list.length
    }
  }
};
</script>
<style lang="stylus" scoped>
// 高宽比：200：640  假设宽100%，高就是200/640% = 31.25%
// >>> 表示样式穿透，免得scoped限制
.wrapper >>> .swiper-pagination-bullet-active
  background: #fff
.wrapper
  overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 26%
  background: #eee
  .swiper-img
    width: 100%
</style>
