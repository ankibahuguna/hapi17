module.exports = {
    extends: "airbnb-base",
    rules: {
        quotes: ["error", "double"],
        "no-underscore-dangle": ["error", { allow: ["_id"] }],
        "one-var": ["error", "never"],
        "max-len": ["error", 100, { ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
        "no-use-before-define": 0,
        "no-param-reassign": 0,
    },
    env: {
        mocha: true,
    },
};
