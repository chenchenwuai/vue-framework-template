import Cookies from 'js-cookie'

const state = {
  device: 'desktop',
  size: Cookies.get('size') || 'small',
  documentHidden: false
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_DOCUMENT_HIDDEN: (state, flag) => {
    state.documentHidden = flag
  }
}

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setDocumentHidden({ commit }, flag) {
    commit('SET_DOCUMENT_HIDDEN', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
