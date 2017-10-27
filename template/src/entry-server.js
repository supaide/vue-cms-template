import { createApp} from './app'
export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp(context)
    router.onReady(() => {
      resolve(app)
    })
  })
}