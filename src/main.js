import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入reset.css
import "./assets/styles/reset.css";
// 引入1px边框
import "./assets/styles/border.css";
// 引入300延迟
import fastClick from "fastclick";
// 引入icont图标
import "./assets/styles/iconfont.css";
// 引入轮播插件
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
