module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "extends": "airbnb" ,
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "prefer-arrow-callback": "off",
        "no-await-in-loop": "off",
        "consistent-return": "off",
        "no-alert": "off"
    }
};