import Vue from 'vue'
import Vuex from 'vuex'
import {use} from "element-ui";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data : [],
    selected : [],
    order_list : [],
    use : {
      useid : '',
      usename : ''
    }
  },
  getters: {
    visible(state) {
      return state.selected.length === 0;
    },
    islogin(state){
      return state.use.useid === ''
    }
  },
  mutations: {
    get_data(state,data){
      state.data = data
    },
    get_useid(state, obg) {
      state.use = Object.assign(obg)
    },
    get_select(state,arr){
      state.selected = arr
    },
    get_order(state,arr){
      state.order_list = arr
    },
    push_order_list(state,obj){
      state.order_list.push(obj)
    }
  },
  actions: {
  },
  modules: {
  }
})
