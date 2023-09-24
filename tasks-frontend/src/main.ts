import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes/appRoutes'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vue3-toastify/dist/index.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'v3-infinite-loading/lib/style.css'
import Vue3Toasity from 'vue3-toastify'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Toasity, {
    autoClose: 3000,
    closeButton: false
  })
  .mount('#app')
