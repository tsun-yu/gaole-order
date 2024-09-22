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
  RiSendPlane2Line,
  PiVenusaur,
  PiCharizard,
  PiBlastoise,
  PiArticuno,
  PiZapdos,
  PiMoltres,
  PiDragonite,
  PiMewtwo,
  PiMew,
  PiRaikou,
  PiEntei,
  PiSuicune,
  PiLugia,
  PiHoOh,
  PiRegirock,
  PiRegice,
  PiRegisteel,
  PiLatias,
  PiLatios,
  PiKyogre,
  PiGroudon,
  PiRayquaza,
  PiMeganium,
  PiTyphlosion,
  PiFeraligatr,
  PiSceptile,
  PiBlaziken,
  PiSwampert
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
  RiSendPlane2Line,
  PiVenusaur,
  PiCharizard,
  PiBlastoise,
  PiArticuno,
  PiZapdos,
  PiMoltres,
  PiDragonite,
  PiMewtwo,
  PiMew,
  PiRaikou,
  PiEntei,
  PiSuicune,
  PiLugia,
  PiHoOh,
  PiRegirock,
  PiRegice,
  PiRegisteel,
  PiLatias,
  PiLatios,
  PiKyogre,
  PiGroudon,
  PiRayquaza,
  PiMeganium,
  PiTyphlosion,
  PiFeraligatr,
  PiSceptile,
  PiBlaziken,
  PiSwampert
);

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

app.component('v-icon', OhVueIcon);
app.mount('#app');
