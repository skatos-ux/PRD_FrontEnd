import Popper from 'vue3-popper';

import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { injectionKey, store } from './store';

import App from './App.vue';

import router from './router/index';

library.add(fas);

const app = createApp(App);
app.use(router);
app.use(store, injectionKey);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('p-tooltip', Popper);
app.mount('#app');
