import Vue from 'vue';
import App from './App.vue';

import './registerServiceWorker'; // PWA
import router from './router'; // Router
import store from './store'; // Vuex
import vuetify from './plugins/vuetify'; // Vuetify

import VueHotkey from 'v-hotkey'; // Hotkey
import VueMeta from 'vue-meta'; // Meta

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.use(VueHotkey);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
