export const sortAlphAsc = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const sortAlphDesc = (a, b) => {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
};

export const sortLightest = (a, b) => {
  if (
    parseInt(a.weight.split(" ").at(-1)) < parseInt(b.weight.split(" ").at(-1))
  ) {
    return -1;
  }
  if (
    parseInt(a.weight.split(" ").at(-1)) > parseInt(b.weight.split(" ").at(-1))
  ) {
    return 1;
  }
  return 0;
};

export const sortHeaviest = (a, b) => {
  if (
    parseInt(a.weight.split(" ").at(-1)) < parseInt(b.weight.split(" ").at(-1))
  ) {
    return 1;
  }
  if (
    parseInt(a.weight.split(" ").at(-1)) > parseInt(b.weight.split(" ").at(-1))
  ) {
    return -1;
  }
  return 0;
};
