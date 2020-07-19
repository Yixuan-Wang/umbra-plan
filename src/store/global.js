import { mutationToggle/*, genMutationActions*/ } from './helper';

const state = () => ({
  displayDial: false,
  displayBarConsole: false,
  displayBarAdd: false,
});

const mutations = {
  toggleDial: mutationToggle('displayDial'),
  toggleBarConsole: mutationToggle('displayBarConsole'),
  toggleBarAdd: mutationToggle('displayBarAdd'),
};

const actions = {
  error(_context, { error, code, popAlert = false }) {
    if (popAlert) alert(`${code}\n${error}`);
    // eslint-disable-next-line no-console
    console.error(error, code);
  },
  //...genMutationActions(Object.keys(mutations)),
};

export default {
  state,
  mutations,
  actions,
};
