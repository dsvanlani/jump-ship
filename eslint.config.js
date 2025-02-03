import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  { ignores: ["dist/**/*", "node_modules/**"] },
  {
    rules: {
      "no-console": "warn",
    },
    files: ["**/*.js", "**/*.mjs", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        // Node.js globals
        process: true,
        __dirname: true,
        __filename: true,
        module: true,
        require: true,
        console: true,
        // Electron main process globals
        electron: true,
        // Electron renderer process globals
        window: true,
        document: true,
        localStorage: true,
        sessionStorage: true,
        WebSocket: true,
        fetch: true,
        // Electron IPC globals
        ipcRenderer: true,
        ipcMain: true,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
];
