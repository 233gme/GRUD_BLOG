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
    'no-inline-comments': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'object-curly-spacing': ['error', 'always'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': [2, {
      code: 120,
      ignoreComments: true,
    }],
  },
};
