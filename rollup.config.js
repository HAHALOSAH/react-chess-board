const pkg = require('./package.json');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'auto'
            },
            {
                file: pkg.module,
                format: 'esm'
            }
        ],
        plugins: [
            typescript()
        ],
        external: [
            "react", "react/jsx-runtime"
        ]
    }
];