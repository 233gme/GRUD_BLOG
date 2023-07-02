export const generateUniqueId = () => {
  return Date.now().toString(32) + Math.random().toString(16);
};
