import Vue from 'vue'
//import {ValidateMixin} from 'spd-ui'                  
import ViewRouter from 'spd-page-manage'
import pageConfigs from './pages'
import iView from 'iview'

let store = {}

Vue.use(ViewRouter, store)                                                    
Vue.use(iView)
//Vue.mixin(ValidateMixin)

import App from './App.vue'
export function createApp (context) {
  const router = new ViewRouter(pageConfigs, {
    //transition: false,                                                        
    //transitionName: 'no-mode-absolute-fade',                                    
    //historyMaxSize: 3,                                                        
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
      let tpid = 0                                                              
      if (params && params.tpid) {
        tpid = params.tpid
      }
      //event.emit('on-tpid', tpid)
    }
  })
  if (context && context.url) {
    router.setStartUrl(context.url)
  }
  const app = new Vue({
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router }
}
