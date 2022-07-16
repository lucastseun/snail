import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import httpOk from './common/htttpOk'

const app = createApp(App)
app.provide('httpOk', httpOk)
app.mount('#app')
