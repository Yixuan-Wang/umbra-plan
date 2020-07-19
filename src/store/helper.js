export function genMutationActions(mutations) {
  let actions = {};
  for (let mutation of mutations) {
    actions[mutation] = (context, args = []) => {
      context.commit(mutation, ...args);
    };
  }
  return actions;
}

export function mutationSet(name, value) {
  return (state) => (state[name] = value);
}

export function mutationToggle(name) {
  return (state) => (state[name] = !state[name]);
}