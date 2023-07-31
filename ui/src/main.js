import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupI18n } from './helpers/i18n'
import stateRefreshPlugin from './helpers/state-refresh'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(setupI18n())
app.use(router)
app.use(stateRefreshPlugin)

app.mount('#app')
