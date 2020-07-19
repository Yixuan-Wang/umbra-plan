import db from '@/database';

const state = () => ({
  available: false,
  status: 'yet-not-checked',
  /* boxes: {
    all: null,
    测试: null,
  }, */
});

const mutations = {
  set_status: (state, { able, status }) => {
    state.available = able;
    state.status = status;
  },
};

const actions = {
  /* addPlan({ state, commit }, { plan }) {
    plan.status = 0;
    db.plans.add(plan)
      .then(() => {
        commit('stamp_boxes', { boxes: Object.keys(state.boxes) });
      });
  }, */
  DB() {
    return db;
  },
  /* async getPlans(_context, { box = 'all' }) {
    let plans = box === 'all'
      ? await db.plans.toArray()
      : await db.plans.filter((item) => item.do.includes(box)).toArray();
    return plans;
  }, */
  open({ commit, dispatch }) {
    db.open()
      .then(() => commit('set_status', { able: true, status: 'ok' }))
      .catch((error) => {
        commit('set_status', { able: false, status: 'fail-to-open' });
        dispatch('error', {
          error,
          code: 'database/fail-to-open',
          popAlert: true,
        }, { root: true });
      });
  },
  clear() {
    db.delete().then(() => {
      window.location.reload();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
