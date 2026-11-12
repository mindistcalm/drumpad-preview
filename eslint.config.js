import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import react from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    files: ['*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      '@eslint-react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@eslint-react/no-missing-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true,
        extraHOCs: ['motion'],
        allowExportNames: ['drumTypes'],
      }],
    },
  },
]
