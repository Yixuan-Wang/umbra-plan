export function parseBox(rule) {
  let regexes = {
    do: [],
    // tags: [],
  };
  let items = rule.split(' ');
  for (let item of items) {
    /* if (item.startsWith('#')) {
      item = item.slice(1, -1);
      predicateDict.tags.push(RegExp(item, 'g'));
    } else if (item.startsWith('$')) {
      item = item.slice(1, -1);
    } */
    regexes.do.push(RegExp(item, 'g'));
  }

  return (plan) => {
    if (plan === undefined) return false;
    return regexes.do.map((doRegEx) => !!plan.do.match(doRegEx))
      .every((bool) => bool);
  };
}
