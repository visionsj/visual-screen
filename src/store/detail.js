// 详细信息
const Detail = {
  state: {
    isDetail: false, // 是否显示详细信息
    isCleanChinaDetail: false, // 是否显示详细信息
    info: {} // 信息
  },

  // 特别注意，子模块的mutations和getters、actions都是注册在全局store上的
  mutations: {
    // 改变详细信息状态
    changeDetailState(state, payload) {
      state.isDetail = payload
    },

    // 改变清关详细信息状态
    changeCleanChinaDetailState(state, payload) {
      state.isCleanChinaDetail = payload
    },

    // 更新详细信息
    updateDetailInfo(state, payload) {
      state.info = payload
    }
  },
  getters: {}
}

export default Detail
