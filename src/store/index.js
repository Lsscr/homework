import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data : [],
    selected : []
  },
  getters: {
    visible(state) {
      return state.selected.length === 0;
    },

  },
  mutations: {
    get_data(state,data){
      state.data = data
    }
  },
  actions: {
  },
  modules: {
  }
})
