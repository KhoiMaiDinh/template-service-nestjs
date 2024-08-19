module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
    'error',
      {
        types: {
          'Object': {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          'Function': {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          'Boolean': {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
            fixWith: 'boolean',
          },
          'Number': {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
            fixWith: 'number',
          },
          'Symbol': {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
            fixWith: 'symbol',
          },
          'String': {
            message: 'Avoid using the `String` type. Did you mean `string`?',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
          'object': {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
        },
      },
    ],
    'prettier/prettier': [
      'error', {singleQuote: true, trailingComma: 'all', tabWidth: 2, bracketSpacing: true},
      "error", { "endOfLine": "auto" }
    ],
  },
};
