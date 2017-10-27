import Vue from 'vue'
import {createApp} from './app'
import {Installer} from 'spd-ui'
Vue.use(Installer, window)

const { app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})
