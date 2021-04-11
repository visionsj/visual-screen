import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const clearanceChina = () =>
  import(/* webpackChunkName: "clearanceChina" */ '@/pages/clearanceChina')
const clearanceZJ = () =>
  import(/* webpackChunkName: "clearanceZJ" */ '@/pages/clearanceZJ')
const policyZJ = () =>
  import(/* webpackChunkName: "policyZJ" */ '@/pages/policyZJ')
const factors = () =>
  import(/* webpackChunkName: "factors" */ '@/pages/factors')
const logistics = () =>
  import(/* webpackChunkName: "logistics" */ '@/pages/logistics')
const business = () =>
  import(/* webpackChunkName: "business" */ '@/pages/business')
const overTime = () =>
  import(/* webpackChunkName: "overTime" */ '@/pages/overTime')
const detail = () =>
  import(/* webpackChunkName: "detail" */ '@/pages/detail')

const router = new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/1',
    name: 'clearanceChina',
    component: clearanceChina,
    meta: {
      title: '全国货物整体通关时间概览'
    }
  }, {
    path: '/2',
    name: 'clearanceZJ',
    component: clearanceZJ,
    meta: {
      title: '浙江省货物整体通关时间概览'
    }
  }, {
    path: '/3',
    name: 'overTime',
    component: overTime,
    meta: {
      title: '浙江省口岸超时通关分析'
    }
  }, {
    path: '/4',
    name: 'policyZJ',
    component: policyZJ,
    meta: {
      title: '浙江省口岸通关政策分析'
    }
  }, {
    path: '/5',
    name: 'factors',
    component: factors,
    meta: {
      title: '影响整体通关时间分析'
    }
  }, {
    path: '/6',
    name: 'logistics',
    component: logistics,
    meta: {
      title: '全程物流时效评估分析'
    }
  }, {
    path: '/7',
    name: 'business',
    component: business,
    meta: {
      title: '作业效率分析'
    }
  }, {
    path: '/d',
    name: 'detail',
    component: detail,
    meta: {
      title: '详细'
    }
  }, {
    path: '*',
    redirect: '/1'
  }]
})
export default router
