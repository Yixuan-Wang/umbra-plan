module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'curly': ['warn', 'multi-or-nest'],
    'generator-star-spacing': ['warn', 'before'],
    'indent': [
      'warn',
      2,
      {
        CallExpression: { arguments: 'first' },
        VariableDeclarator: { 'var': 2, 'let': 2, 'const': 3 },
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'keyword-spacing': ['warn', { 'before': true, 'after': true }],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-multi-spaces': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': ['warn', { 'varsIgnorePattern': '^_' }],
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'space-before-blocks': 'warn',
    'space-infix-ops': 'warn',
    'template-curly-spacing': 'warn',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: {
          max: 3,
          allowFirstLine: false,
        },
      },
    ],
    'vue/script-indent': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
