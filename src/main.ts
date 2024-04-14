import { createApp } from 'vue';
import App from './App.vue';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import {
  HiDocumentText,
  BiListCheck,
  IoCloseSharp,
  PxTrash,
} from 'oh-vue-icons/icons';
import { createPinia } from 'pinia';

const pinia = createPinia();
addIcons(HiDocumentText, BiListCheck, IoCloseSharp, PxTrash);

createApp(App).use(pinia).component('Icon', OhVueIcon).mount('#app');
