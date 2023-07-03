export const generateTagsFromString = (string) => {
  if (string && string.length) {
    return string.split(/\ |\+|\-|\*|\/|\#|\,|\.|\_/)
      .filter(Boolean)
      .map(item => {
        const tag = item.trim();
        if (tag.length) {
          return `#${item}`;
        }
      });
  } else {
    return [];
  }
};
