import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store'

// CSS & Plugins
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import BootstrapVue3 from 'bootstrap-vue-3'

import AOS from 'aos'
import 'aos/dist/aos.css'

// Quill (Vue 3 compatible)
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// Leaflet
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

// Init AOS
AOS.init()

// Create App
const app = createApp(App)

app.use(router)
app.use(BootstrapVue3)
app.use(store)

// 👉 Enregistrement global du composant Quill
app.component('QuillEditor', QuillEditor)

app.mount('#app')
