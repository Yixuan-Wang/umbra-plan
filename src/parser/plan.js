export function parsePlan(text) {
  let plan = {
    do: null,
    tags: [],
    status: 0,
  };
  /* let fragments = text.split(/ (?=#)| (?=@)/g);
  for (let fragment of fragments) {
    if (fragment.startsWith('#'))
      plan.tags.push(fragment.slice(1));
    else
      plan.do = fragment;
  } */
  plan.do = text;

  if (plan.do === null) throw Error;

  return plan;
}