import Vue from 'vue'
import {createApp} from './app'
import 'iview/dist/styles/iview.css'

const { app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})
