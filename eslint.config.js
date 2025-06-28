import { FlatCompat } from "@eslint/eslintrc"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import globals from "globals"
import tseslint from "typescript-eslint"

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const config = [
    { ignores: [".next/**", "public/**", "next.config.js", "postcss.config.js", ".node_modules"] },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintPluginUnicorn.configs["recommended"],
    ...compat.config({
        extends: ["next"],
        settings: {
            next: {
                rootDir: ".",
            },
        },
    }),
    ...compat.config({
        extends: ["plugin:drizzle/all"],
    }),
    {
        rules: {
            "no-undef": "error",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": [
                "error", // or "error"
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "unicorn/prevent-abbreviations": "off",
        },
    },
    {
        files: ["**/*.{jsx,tsx}"],
        rules: {
            "no-console": "warn",
        },
    },
]
export default config