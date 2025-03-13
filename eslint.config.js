module.exports = [
  {
    ignores: ['node_modules/', '.expo/', 'dist/', 'web-build/'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
      },
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'import': require('eslint-plugin-import'),
      'react': require('eslint-plugin-react'),
    },
    settings: {
      react: {
        version: '18.2.0',
      },
      'import/resolver': {
        'babel-module': {
          alias: {
            '@assets': './assets',
            '@app': './app',
            '@config': './app/config',
            '@components': './components',
            '@reducers': './app/reducers',
            '@services': './app/services',
            '@shared': './app/shared',
            '@locale': './locale',
            '~': './'
          }
        }
      }
    },
    rules: {
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-spreading': 0,
      'react/no-unescaped-entities': 0,
      'linebreak-style': 0,
      'react/forbid-prop-types': 0,
      'react/prefer-stateless-function': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-curly-spacing': 1,
      'react/sort-comp': 0,
      'react/state-in-constructor': 0,
      'react/jsx-fragments': 0,
      'react/static-property-placement': 0,
      'react/jsx-no-useless-fragment': 'off',
      'react/require-default-props': 'off',
      '@typescript-eslint/default-param-last': 'off',
      'react/function-component-definition': [
        2,
        {
          'namedComponents': 'arrow-function',
          'unnamedComponents': 'arrow-function'
        }
      ],
      'react/prop-types': [
        'error'
      ],
      'comma-spacing': [
        'error',
        {
          'before': false,
          'after': true
        }
      ],
      'camelcase': [
        'error',
        {
          'ignoreDestructuring': true,
          'properties': 'never'
        }
      ],
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'array-bracket-spacing': [
        'error',
        'always'
      ],
      'semi': 2,
      'no-cond-assign': 0,
      'no-console': 2,
      'no-alert': 2,
      'no-div-regex': 0,
      'no-else-return': 2,
      'no-shadow': 2,
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'no-mixed-spaces-and-tabs': 2,
      'no-multiple-empty-lines': 2,
      'keyword-spacing': 2,
      'space-before-blocks': 2,
      'space-in-parens': 2,
      'space-infix-ops': 2,
      'space-unary-ops': 2,
      'no-unused-vars': 2,
      'no-underscore-dangle': 0,
      'class-methods-use-this': 0,
      'eqeqeq': 2,
      'no-return-assign': 1,
      'no-unused-expressions': 2,
      'no-plusplus': 0,
      'no-lonely-if': 1,
      'radix': 0,
      'arrow-parens': 0,
      'no-useless-rename': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'no-script-url': 0,
      'react/jsx-no-script-url': 0
    }
  }
];
