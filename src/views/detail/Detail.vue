<template>
  <div>
    <detail-banner
      :bannerImgs="bannerImgs"
      :bannerImg="bannerImg"
      :sightName="sightName"
    ></detail-banner>
    <Header></Header>
    <div>
      <List :list="list"></List>
    </div>
  </div>
</template>
<script>
import DetailBanner from './components/Banner.vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import axios from 'axios'
export default {
  name: "Detail",
  data: function() {
    return {
      bannerImgs: [],
      bannerImg: "",
      sightName: '',
      list: []
    }
  },
  methods: {
    getDetailInfo(){
      axios.get('https://easy-mock.com/mock/5d08972d3b0e1851b770cb98/example/travel/detail#!method=get',{
        params: {
          id: this.$route.params.id
        }
      }).then(this.handleGetDataSucc)
    },
    handleGetDataSucc(res){
      res = res.data
      console.log(res)
      if(res.ret){
        this.bannerImgs = res.data.gallaryImgs
        this.bannerImg = res.data.bannerImg
        this.sightName = res.data.sightName
        this.list = res.data.categoryList
      }
    }
  },
  mounted(){
    this.getDetailInfo()
  },
  components: {
    DetailBanner,
    List,
    Header
  }
}
</script>
<style lang="stylus" scoped>
.content
    height: 50rem
</style>
