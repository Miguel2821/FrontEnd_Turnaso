module.exports = {
    parserOptions: {
      parser: "@babel/eslint-parser",
      requireConfigFile: false,
    },
    env: {
      browser: true,
      node: true,
    },
    extends: [
      "plugin:vue/vue3-essential", // Para Vue 3
      "eslint:recommended"
    ],
    rules: {
      // Agrega tus reglas personalizadas aquí si es necesario
    },
  };
  