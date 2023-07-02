import { generateUniqueId } from '../index';

export const options = {
  spellChecker: false,
  maxHeight: '400px',
  autofocus: true,
  status: false,
  autosave: {
    enabled: true,
    uniqueId: generateUniqueId(),
    delay: 1000,
  },
};
