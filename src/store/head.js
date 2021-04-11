import { getNowFormatDate } from '../plugins/utils'

// 用户模块
const Head = {
  state: {
    title: null, // 标题
    month: (Number(getNowFormatDate('YYYY-MM')) - 1).toString() || '',
    // month: getPreMonth || '',
    cityStatus: 2,
    departmentStatus: 1,
    city: ''
  },

  // 特别注意，子模块的mutations和getters、actions都是注册在全局store上的
  mutations: {
    changeHeadTitle(state, payload) {
      state.title = payload
    },
    updateMonth(state, payload) {
      state.month = payload
    },
    updateCityStatus(state, payload) {
      state.cityStatus = payload
    },
    updateDepartmentStatus(state, payload) {
      state.departmentStatus = payload
    },
    updateCity(state, payload) {
      state.city = payload
    }
  },
  getters: {}
}

export default Head
