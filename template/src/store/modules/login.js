import * as types from '../types'

let state = {
  cmsuid: 0,
  token: '',
  expire: 0,
  _name: '',
  _type: 0,
  isLogin: false
}

const DefaultVaule = {
  _name: '',
  token: ''
}

let storageKeys = ['cmsuid', 'token', 'expire', '_name', '_type']

let setLoginStatus = function () {
  state.isLogin = !!(state.token && state.token.length > 5 && state.expire > new Date()/1000)
}

let mutations = {
  [types.LOGIN_INIT] (state) {
    storageKeys.forEach(function (name) {
      let v = localStorage.getItem(name)
      state[name] = v ? v : (typeof DefaultVaule[name] !== 'undefined' ? DefaultVaule[name] : 0)
    })
    setLoginStatus()
  },
  [types.LOGIN_SET] (state, user) {
    for (let k in user) {
      if (typeof state[k] !== 'undefined') {
        state[k] = user[k]
      }
    }
    setLoginStatus()
    storageKeys.forEach(function (name) {
      localStorage.setItem(name, state[name]) 
    })
  }
}

const actions = {
  [types.LOGIN_LOGIN] ( {commit}, params) {
  }
}

export default {
  state,
  mutations,
  actions
}
