import Vue from 'vue';
import Vuex from 'vuex';

import global from './global';
import database from './modules/database';
import keymap from './modules/keymap';
import plan from './modules/plan';
import box from './modules/box';

Vue.use(Vuex);

const DEBUG = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: global.state,
  mutations: global.mutations,
  actions: global.actions,
  modules: {
    database,
    keymap,
    plan,
    box,
  },
  strict: DEBUG,
});
