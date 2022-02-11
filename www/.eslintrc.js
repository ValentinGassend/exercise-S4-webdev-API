module.exports = {
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'sourceType': 'module',
        'allowImportExportEverywhere': true,
        'codeFrame': false,
        'ecmaVersion': 8,
    },

    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },

    'plugins': [
        'import',
        'node',
        'promise',
        'standard'
    ],

    'globals': {
        'document': false,
        'navigator': false,
        'window': false
    },

    'extends': 'eslint:recommended',
};
