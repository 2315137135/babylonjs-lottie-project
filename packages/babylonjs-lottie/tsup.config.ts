import {defineConfig} from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    external: ["@babylonjs/core"],
    splitting: true,
    sourcemap: false,
    clean: true,
    dts: true,
    bundle: true,
    format: ['esm'],
    outDir: "dist"
})
