import {defineConfig} from "vite"
import {resolve} from 'path'
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [dts()],

    build: {
        lib: {
            name: "LOTTIE",
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ["umd", "es"],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ["@babylonjs/core"],
            output: {
                globals: {
                    "@babylonjs/core": "BABYLON"
                }
            },
        }
    }

})
