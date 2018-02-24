// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ViewRouter from 'vue-page-manage'
import {http, event} from 'h5-webutil'

import pageConfigs from './pages'
import store from './store'

Vue.use(ViewRouter)

import 'iview/dist/styles/iview.css'
{{#if_eq dependency "totaly"}}
import iView from 'iview'
Vue.use(iView)
{{/if_eq}}

Vue.config.productionTip = false

const router = new ViewRouter(pageConfigs, {                                 
  beforeEach (to, from, startPos, forward, next) {                                
    if (typeof window !== 'undefined') {                                     
      window.scrollTo(0, 0)                                                         
    }
    let route = to[startPos][1]                                               
    /*
      if ((!route.meta || route.meta.login !== false) && !store.state.login.isLogin) {
        this.goto('login') 
        return
      }
      */
    next()
  },
  beforeEnter (router, params) {
    /*
    let tpid = 0
    if (params && params.tpid) {                                             
      tpid = params.tpid
    }
    event.emit('on-tpid', tpid)
    */
  }
})
//if (context && context.url) {
//  router.setStartUrl(context.url)
//}

let apiHost = 'http://cyij.cms.supaide.com'
http.config({
	preProcess (json, dataType, success, error) {
    if (dataType !== 'json') {
      return json
    }
    if (json.status == -2) {
      event.emit('do-login')
      return null
    } else if (json.status == -1) {
      if (error) {
        error(json.result, json.msg)
      }
      return null
    } else if (json.status == -3) {
      event.emit('not-allowed')
      toast('访问受限', 2000);
      return null
    } else {
      if (json.loginExtra) {
        // 更新token
        store.commit(store.types.LOGIN_SET, json.loginExtra)
      }
    }
    return [json.result, json.extra]
  },
  defaultParams () {
    let p = {cmsuid: store.state.login.cmsuid}
    if (store.state.login.isLogin) {
      p.token = store.state.login.token
      p.expire = store.state.login.expire
    }
    return p
  },
  urlPrefix: apiHost
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
