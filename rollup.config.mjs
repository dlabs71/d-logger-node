import {babel} from "@rollup/plugin-babel";
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import del from "rollup-plugin-delete";
import externals from "rollup-plugin-node-externals";

export default [{
    input: 'src/index.js',
    output: [
        {
            file: 'dist/d-logger-node.umd.min.js',
            format: 'umd',
            name: 'd-logger-node',
            globals: {
                "@dlabs71/d-logger": "dLogger",
                "node:fs": "fs",
                "node:path": "path"
            }
        },
        {
            file: 'dist/d-logger-node.cjs.min.js',
            format: 'cjs',
            name: 'd-logger-node'
        },
        {
            file: 'dist/d-logger-node.esm.min.js',
            format: 'esm',
            name: 'd-logger-node'
        }
    ],
    plugins: [
        del({targets: "dist/*"}),
        externals({deps: true}),
        nodeResolve(),
        babel({
            babelrc: false,
            exclude: "**/node_modules/**",
            presets: [
                "@babel/preset-env"
            ],
            plugins: [
                "@babel/plugin-transform-runtime"
            ],
            babelHelpers: "runtime"
        }),
        commonjs(),
        terser()
    ],
}];