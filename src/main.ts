import { createApp } from 'vue';
import App from './App.vue';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { FaChevronDown, HiDocumentText, BiListCheck } from 'oh-vue-icons/icons';
import { createPinia } from 'pinia';

const pinia = createPinia();
addIcons(FaChevronDown, HiDocumentText, BiListCheck);

createApp(App).use(pinia).component('Icon', OhVueIcon).mount('#app');
