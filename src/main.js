import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VuePapaParse from 'vue-papa-parse'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VuePapaParse)

app.mount('#app')
