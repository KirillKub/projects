module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-bitwise": "off",
        "no-continue": "off",
        "consistent-return": "off",
        "prefer-arrow-callback": "off",
        "radix": "off",
        "import/no-cycle": "off",
        "import/no-mutable-exports": "off"
    }
};