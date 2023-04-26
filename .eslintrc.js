module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:promise/recommended',
        'prettier',
    ],
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        /**
         * 不是 eslint 官方的配置，是 @typescript-eslint 的配置
         * @link https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject
         */
        project: 'tsconfig.json',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        // 允许空接口
        '@typescript-eslint/no-empty-interface': 'off',
        // 允许空的块语句
        'no-empty': 'off',
        // 禁止对函数参数再赋值是否对属性检查，禁用该检查可以使用原地算法
        'no-param-reassign': ['error', { props: false }],
        // 使用 react 17 jsx runtime
        'react/react-in-jsx-scope': 'off',
        // 不强制 defaultProps
        'react/require-default-props': 'off',
        // 用啥 export 自己判断
        'import/prefer-default-export': 'off',
        // 允许非空断言
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 允许匿名 function
        'func-names': 'off',
        // 允许 props 展开
        'react/jsx-props-no-spreading': 'off',
        // 允许位运算
        'no-bitwise': 'off',
        // 关闭 prop-types 验证
        'react/prop-types': 'off',
        // 使用 index 作为 key 改为警告，而不是报错
        'react/no-array-index-key': 'warn',
        // 无 key 报错
        'react/jsx-key': 'error',
        // 从 airbnb 规则中移除 for of 的禁用
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        // 没有++ --操作
        'no-plusplus': 'off',
        // 允许 prefix _
        'no-underscore-dangle': 'off',
        // 允许变量使用 _ 和 __ 开始或结尾
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allowSingleOrDouble',
                trailingUnderscore: 'allowSingleOrDouble',
            },
        ],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'type', 'object'],
                alphabetize: {
                    order: 'asc',
                },
            },
        ],
        'import/no-extraneous-dependencies': 'off',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },
};
