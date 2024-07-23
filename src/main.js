import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiSolidFilter, IoChevronDownOutline } from 'oh-vue-icons/icons'

addIcons(HiSolidFilter, IoChevronDownOutline)

const app = createApp(App)

app.use(router)

app.component('v-icon', OhVueIcon)
app.mount('#app')
