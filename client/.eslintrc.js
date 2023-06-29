module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': [2, {
      code: 120,
      ignoreComments: true,
    }],
  },
};
