import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {store} from './store'

// Plugins et CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue3 from 'bootstrap-vue-3'

import AOS from 'aos'
import 'aos/dist/aos.css'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

// Configuration Leaflet (identique)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Supprime la méthode par défaut
delete L.Icon.Default.prototype._getIconUrl;

// Merge avec les bonnes URLs importées
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Init AOS
AOS.init()

// Créer l'app
const app = createApp(App)

// Utiliser les plugins
app.use(router)
app.use(BootstrapVue3)
app.use(store)
// Monter l'application
app.mount('#app')
