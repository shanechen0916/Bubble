module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-spacing": [
            "error",
            {
            "after": true
            }
        ],
        "block-spacing": [
            "error",
            "never"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        // "no-trailing-spaces": "error",
        // "object-curly-spacing": [
        //     "error",
        //     "never"
        // ],
        // "quote-props": ["error", "always"],
        "space-before-function-paren": [
            "error",
            "always"
        ],
        "space-in-parens": [
            "error",
            "never"
        ],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-unreachable": "off",
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-control-regex": "off",
        "no-debugger": "off",
        "no-fallthrough": ["error", { "commentPattern": "break[\\s\\w]*omitted" }],
        "space-infix-ops": 2,
    },
    "globals": {
        "cc": true,
        "CC_EDITOR": true,
        "Editor": true,
        "FBInstant": true,
        "i18n": true,
        "protobuf": true,
        "gl": true,
        "process": true,
        "sharedCanvas": true,
        "GameStatusInfo": true,
        "BK":true,
        "CC_WECHATGAME":true,
        "dragonBones": true,
    }
};