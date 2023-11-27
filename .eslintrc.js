module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],

    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        allowImportExportEverywhere: true,
    },

    rules: {
        'max-len': ['error', 100, 2, { ignoreUrls: true }],
        'no-console': 'warn',
        'no-alert': 'warn',
        'linebreak-style': 'off',
        'no-param-reassign': 'off',
        'no-unsafe-optional-chaining': 'off',
        'no-plusplus': 'off',
        'object-curly-newline': 'off',
        radix: 'off',

        'react/require-default-props': 'off',
        'react/forbid-prop-types': 'warn',
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'react/destructuring-assignment': 'off',

        'prefer-destructuring': 'off',

        'react/no-find-dom-node': 'off',
        'react/no-did-mount-set-state': 'off',
        'react/no-unused-prop-types': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/state-in-constructor': 'off',

        'jsx-a11y/anchor-is-valid': [
            'error',
            { components: ['Link'], specialLink: ['to'] },
        ],
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'prettier/prettier': ['error'],
    },
}
