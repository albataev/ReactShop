module.exports = {
  extends: ['airbnb', 'plugin:jsx-a11y/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      es6: true
    }
  },
  plugins: ['sort-class-members', 'jsx-a11y', 'import'],
  'globals': {
    'fetch': false,
    'Headers': false,
    'FormData': false,
    'localStorage': false
  },
  'rules': { 'react/jsx-filename-extension': [0],
      'indent': ['error', 4],
      'react/jsx-indent': ['error', 4],
      'react/jsx-indent-props': ['error', 4],
      'no-console': 'off',
      'max-len': 'off',
      'import/no-named-as-default': 0, // https://stackoverflow.com/questions/44437203/how-do-i-resolve-eslint-import-no-named-as-default
      'react/destructuring-assignment': 'off',
      'linebreak-style': 0,
      'no-shadow': 'off',
      'react/sort-comp': 'off',
      'no-param-reassign': 'off',
      'comma-dangle': [
          'error',
          {
              arrays: 'never',
              objects: 'never',
              imports: 'never',
              exports: 'never',
              functions: 'never'
          }
      ],
      'react/prefer-stateless-function': 'off',
      'no-mixed-operators': 'off',
      'no-confusing-arrow': 'off',
      'no-bitwise': 'off',
      'function-paren-newline': 'off',
      'object-curly-newline': 'off',
      'arrow-parens': 'off',
      'no-underscore-dangle': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off'
  }
};

