const pkg = require('./package.json');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'auto',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'esm',
                exports: 'auto',
                sourcemap: true
            }
        ],
        plugins: [
            typescript()
        ],
        external: [
            "react", "react-dom", "react/jsx-runtime"
        ]
    }
];