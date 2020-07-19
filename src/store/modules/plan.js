import db from '@/database';

const state = () => ({
  // bus: new Vue(),
  event: {
    changed: null,
  },
});

const mutations = {
  planChanged(state, change) {
    state.event.changed = change;
  },
};

const actions = {
  add({ commit }, { plan }) {
    plan.status = 0;
    db.plans.add(plan)
      .then((id) => commit('planChanged', {
        type: 'add',
        id,
        plan: { id, ...plan },
      }));
    //.catch((error) => dispatch('error', { error, plan }, { root: true }));
  },
  delete({ commit }, { plan }) {
    if ('id' in plan) {
      db.plans.delete(plan.id)
        .then(() => commit('planChanged', {
          type: 'delete',
          id: plan.id,
          plan,
        }));
    }
  },
  async fetch(_context, { plan }) {
    if ('id' in plan)
      return await db.plans.get(plan.id);
  },
  async modify({ commit, dispatch }, { plan, previousPlan }) {
    if (plan.do.trim() === '') {
      db.plans.get(plan.id)
        .then((previousPlan) => dispatch('delete', { plan: previousPlan }));
      return;
    }
    db.plans.put(plan)
      .then((id) => commit('planChanged', {
        type: 'modify',
        id,
        plan,
        previousPlan,
      }));
  },
  async pull(_context, { predicate }) {
    return await db.plans.filter(predicate).toArray();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};