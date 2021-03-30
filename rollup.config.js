import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

const output = {
  banner: [
    '/*!',
    ` * vue3-typed.js v${pkg.version}`,
    ' * (c) 2021 Filip Vottus',
    ' * Released under the MIT License.',
    ' */',
  ].join('\n'),
  sourcemap: true,
  globals: {
    vue: 'Vue',
  },
};

const babelPlugin = babel({
  exclude: /node_modules\/(?!event-target-shim)/,
  include: ['src/**', 'node_modules/event-target-shim/**'],
  babelHelpers: 'runtime',
});

export default [
  {
    input: 'src/index.ts',
    output: {
      ...output,
      file: pkg.module,
      format: 'esm',
    },
    external: [
      /@babel\/runtime/,
      ...Object.keys(pkg.dependencies || {}),
      ...[...Object.keys(pkg.peerDependencies || {}), 'vue'],
    ],
    plugins: [resolve(), commonjs(), typescript(), babelPlugin],
  },
  {
    input: 'src/index.ts',
    output: {
      ...output,
      file: pkg.unpkg,
      format: 'umd',
      name: 'Vue3Typed',
    },
    external: [...Object.keys(pkg.peerDependencies || {}), 'vue'],
    plugins: [resolve(), commonjs(), typescript(), babelPlugin, terser()],
  },
  {
    input: 'src/index.ts',
    output: {
      ...output,
      file: pkg.main,
      format: 'umd',
      name: 'Vue3Typed',
    },
    external: [...Object.keys(pkg.peerDependencies || {}), 'vue'],
    plugins: [resolve(), commonjs(), typescript(), babelPlugin],
  },
  {
    input: 'src/styles/typed.css',
    output: {
      ...output,
      file: pkg.css,
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
      }),
    ],
  },
  {
    input: 'src/styles/typed.css',
    output: {
      ...output,
      file: pkg.cssMin,
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
        minimize: true,
      }),
    ],
  },
];
