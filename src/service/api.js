/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Message } from 'element-ui'

Vue.use(VueAxios, axios)

// 引入api地址配置
const API_ADDRESS = '/mia/screenApi'
const API_ADDRESS2 = `${__webpack_require__.p}json`

const Api = {}
Api.install = () => {
  let apiCancelTokens = [] // 存放请求cancelToken

  // request请求拦截处理
  Vue.axios.interceptors.request.use((config) => {
    // 添加取消请求用的cancelToken
    config.cancelToken = new Vue.axios.CancelToken((c) => {
      apiCancelTokens.push(c)
    })
    if (config.method === 'get') {
      config.params = Object.assign({ t: Date.now() }, config.params)
    }
    return config
  }, error => Promise.reject(error))

  // response响应拦截处理
  Vue.axios.interceptors.response.use((res) => {
    // 请求成功，但是操作不成功时显示后端返回的错误信息
    if (res.data.status != 0) {
      let msg = res.data.message == '失败' ? '获取数据失败，请稍后重试' : (res.data.message || `${res.config.apiName || '获取数据'}失败`)
      Message({
        message: msg,
        type: 'error'
      })
      console.log('获取数据失败')
    }
    return res.data
  }, (err) => {
    // 判断请求是否被取消
    if (Vue.axios.isCancel(err)) {
      console.log('Request canceled', err.message)
    } else {
      // 如果请求未被取消，则处理错误信息
      Message({
        message: `${err.config.apiName || '获取数据'}失败`,
        type: 'error'
      })
      console.log(`${err.config.apiName || '获取数据'}失败`)
    }
    return Promise.reject(err)
  })


  // 接口列表
  Vue.prototype.Api = {
    // 取消页面当前请求
    apiRequsetCancel() {
      // 依次取消请求
      apiCancelTokens.forEach((cancel) => {
        cancel('请求被取消');
      });
      // 清空cancelToken
      apiCancelTokens = [];
    },

    // 获取全国口岸通关时效概览 ${API_ADDRESS2}/nationClearanceTime.json
    getNationClearanceTime(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/countryStatic`, reqData);
      // return Vue.axios.get(`${API_ADDRESS2}/nationClearanceTime.json`, reqData);
    },
    //获取城市详情页面
    getCityStatics(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/cityStatics`, reqData);
    },

    // 获取浙江省关区通关时效 
    getCustomsStatic(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/second/customsStatic`, reqData);
      // return Vue.axios.get(`${API_ADDRESS2}/second/customsStatic.json`, reqData);
    },

    // 获取全省地图数据或地图数据
    getTransStatic(reqData) {
      // let filename = reqData.groupField == 'LINK' ? 'transStatic' : 'transStaticLink'
      return Vue.axios.post(`${API_ADDRESS}/second/cityStatic`, reqData);
      // return Vue.axios.get(`${API_ADDRESS2}/second/${filename}.json`, reqData);
    },

    getTransNewStatic(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/second/transNewStatic`, reqData);
    },

    // 获取超长报关单
    getOverTimeStatics(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/third/overTimeStatics`, reqData);
      // return Vue.axios.get(`${API_ADDRESS2}/second/customsStatic.json`, reqData);
    },

    // 获取影响通关时效数据
    getTransStatics(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/fifth/transStatics`, reqData)
    },

    // 第四屏担保放行
    getPolicyStatics(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/fourth/policyStatics`, reqData)
    },
    // 第六屏担保放行
    getTradeStatics(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/sixth/tradeStatics`, reqData)
    },
    // 第三六屏通关详细
    getEntryList(reqData) {
      return Vue.axios.post(`${API_ADDRESS}/third/entryList`, reqData)
    }
  }
}

export default Api