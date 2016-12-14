module.exports = {
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        "angular"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};