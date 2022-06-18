import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = '/admin'
axios.defaults.timeout = 1000

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data : [],
      selected : [],
      order_list : [],
      use : {
        useid : '',
        usename : ''
      },
      suer_order : []
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
    },
    async update_date(state){
      const name = window.sessionStorage.getItem("name")
      const useid = window.sessionStorage.getItem("useid")
      state.use = {useid:useid,usename:name}
      state.data = await axios.get("/goods/list")
      state.selected = await axios.post("/cart/listByUser?userId="+useid)
      state.order_list = await axios.post("/order/listByUser?userId="+useid)
    },
    get_sure_order(state,arr){
      state.suer_order = arr
    }
  },
  actions: {
  },
  modules: {
  },
})
