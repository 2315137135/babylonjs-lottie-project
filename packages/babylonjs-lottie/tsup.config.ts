import {defineConfig} from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: true,
    sourcemap: false,
    clean: true,
    dts: true,
    bundle: true,
    target: "es6",
    format: ['cjs', 'esm']
})
