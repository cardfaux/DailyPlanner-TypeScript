module.exports = {
	parser: '@typescript-eslint/parser', // ESLint Parser
	extends: [
		'plugin:@typescript-eslint/recommended' // recommended rules from the plugin
	],
	parserOptions: {
		ecmaVersion: 2020, // Pars modern features
		sourceType: 'module' // alow imports
	},
	rules: {
		'no-shadow': 'warn',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/no-object-literal-type-assertion': 'off'
	}
};
