// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Api from './service/api'
import ECharts from 'vue-echarts'
import router from './plugins/router'
import store from './store'
import ElementUI from 'element-ui'

import './plugins/echarts/vue-echarts'
import './assets/scss/common.css'
import './assets/scss/element-ui.scss'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

// 导入地图
import china from './plugins/map/china.json'
import zhejiang from './plugins/map/province/zhejiang.json'

import * as filters from './plugins/filters'
import directives from './plugins/directives'

// 将过滤器和axios挂载到vue原型上，方便在实例中使用
Vue.prototype.$filter = filters

// echarts地图注册
if (ECharts.registerMap) {
  ECharts.registerMap('china', china)
  ECharts.registerMap('zhejiang', zhejiang)
}

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 注册指定
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

// 导入库
Vue.component('v-chart', ECharts)

Vue.use(Api)
Vue.use(ElementUI)

// 去除生产环境中构建中的提示
Vue.config.productionTip = false

// 设置网页标题和跳转
var app
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '口岸通关时效概览'
  app && app.Api.apiRequsetCancel()
  if (!to.query.url && from.query.url) {
    to.query.url = from.query.url
  }
  next()
})

/* eslint-disable no-new */
app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
