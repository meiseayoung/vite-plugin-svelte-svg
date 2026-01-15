import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/runtime/index.ts'],
  format: ['esm'],
  dts: {
    entry: ['src/index.ts', 'src/runtime/index.ts']
  },
  clean: true,
  external: ['svelte', 'vite', './Svg.svelte']
})
