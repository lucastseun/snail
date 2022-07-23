import { createApp } from 'vue'
import App from './App.vue'
import httpOk from './common/htttpOk'
import router from './routes/routes'

const app = createApp(App)
app.use(router)
app.provide('httpOk', httpOk)
app.mount('#app')
