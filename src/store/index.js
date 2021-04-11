import Vue from 'vue'
import Vuex from 'vuex'

import Detail from './detail'
import Head from './Head'

Vue.use(Vuex)

// 全局store
const store = new Vuex.Store({
  modules: {
    Head,
    Detail
  }
})

export default store
