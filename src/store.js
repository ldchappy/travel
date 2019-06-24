import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let defaultCity = "北京";
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {
  console.log(e);
}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city;
      try {
        localStorage.city = city;
      } catch (e) {
        console.log(e)
      }
    }
  },
  actions: {
    changeCity(ctx, city) {
      console.log(ctx, city)
      ctx.commit("changeCity", city)
    }
  }
});
