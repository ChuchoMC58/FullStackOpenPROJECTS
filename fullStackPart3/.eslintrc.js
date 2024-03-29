module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react'
	],
	'rules': {
	//	'indent': [
	//		'error',
	//		'tab'
	//	],
		'linebreak-style': [
			'error',
			'unix'
		],
		//	'quotes': [
		//		'error',
		//		'single'
		//	],
		'semi': [
			'error',
			'always'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
	//	'object-curly-spacing': [ 
	//		'error', 'always'
	//	],
	//	'arrow-spacing': [
        //	    'error', { 'before': true, 'after': true }
    	//	]	
	}
};
