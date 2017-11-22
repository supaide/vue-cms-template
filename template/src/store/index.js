import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import login from './modules/login'

Vue.use(Vuex)

let store = new Vuex.Store({
  mutations: {
  },
  modules: {
    login
  }
})
store.types = types

export default store
