import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  IoChevronDownOutline,
  MdFilterlistRound,
  PrTimes,
  MdCheckcircleoutlineOutlined,
  MdCheckcircle,
  MdZoomoutmapRound,
  FaTimesCircle,
  MdZoominmapRound,
  MdRefreshRound,
  RiSendPlane2Line
} from 'oh-vue-icons/icons';

addIcons(
  IoChevronDownOutline,
  MdFilterlistRound,
  PrTimes,
  MdCheckcircleoutlineOutlined,
  MdCheckcircle,
  MdZoomoutmapRound,
  FaTimesCircle,
  MdZoominmapRound,
  MdRefreshRound,
  RiSendPlane2Line
);

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

app.component('v-icon', OhVueIcon);
app.mount('#app');
