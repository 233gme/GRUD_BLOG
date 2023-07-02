export const generateTagsFromString = (string) => {
  if (string.length) {
    return string.split(/\ |\+|\-|\*|\/|\#|\,|\.|\_/).map(item => {
      const tag = item.trim();
      if (tag.length) {
        return `#${item}`;
      }
    });
  } else {
    return [];
  }
};
