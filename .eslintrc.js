module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'module-resolver'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-curly-brace-presence': ['warn', { props: 'always', children: 'ignore' }],
    semi: ['warn', 'never'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'module-resolver/use-alias': [
      'error',
      {
        extensions: ['.ts', '.tsx', '.jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
