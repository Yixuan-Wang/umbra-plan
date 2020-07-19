import db from '@/database';

const state = () => ({
  // bus: new Vue(),
  event: {
    changed: null,
  },
});

const mutations = {
  boxChanged(state, change) {
    state.event.changed = change;
  },
};

const actions = {
  add({ commit }, { box }) {
    box.status = 0;
    db.boxes.add(box)
      .then((id) => commit('boxChanged', {
        type: 'add',
        id,
        box: { id, ...box },
      }));
    //.catch((error) => dispatch('error', { error, box }, { root: true }));
  },
  delete({ commit }, { box }) {
    if ('id' in box) {
      db.boxes.delete(box.id)
        .then(() => commit('boxChanged', {
          type: 'delete',
          id: box.id,
          box,
        }));
    }
  },
  async fetch(_context, { box }) {
    if ('id' in box)
      return await db.boxes.get(box.id);
  },
  async modify({ commit, dispatch }, { box, previousbox }) {
    if (box.do.trim() === '') {
      db.boxes.get(box.id)
        .then((previousbox) => dispatch('delete', { box: previousbox }));
      return;
    }
    db.boxes.put(box)
      .then((id) => commit('boxChanged', {
        type: 'modify',
        id,
        box,
        previousbox,
      }));
  },
  async pull(_context, { predicate }) {
    return await db.boxes.filter(predicate).toArray();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};