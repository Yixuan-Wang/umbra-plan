import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans',
  },
  theme: {
    themes: {
      light: {
        primary: '#1d50a2',
        secondary: '#123162',
      },
    },
  },
});
