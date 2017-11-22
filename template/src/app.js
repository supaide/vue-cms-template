import Vue from 'vue'
import ViewRouter from 'spd-page-manage'
import {http, event} from 'spd-webutil'

import pageConfigs from './pages'
import store from './store'

Vue.use(ViewRouter, store)

{{#if_eq importByNeed "Yes"}}
import iView from 'iview'
Vue.use(iView)
{{/if_eq}}

import App from './App.vue'
export function createApp (context) {
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
  if (context && context.url) {
    router.setStartUrl(context.url)
  }

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

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router }
}
