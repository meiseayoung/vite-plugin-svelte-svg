# vite-plugin-svelte-svg

Vite plugin for SVG handling in Svelte 5 projects with dynamic color and size support.

## Features

- 🎨 Dynamic color modification at runtime
- 📐 Flexible sizing with CSS units
- 🔄 Auto-generate TypeScript types for SVG names
- 🔥 HMR support - add/remove SVGs without restart
- 📦 Tree-shakeable

## Installation

```bash
pnpm add vite-plugin-svelte-svg
```

## Usage

### 1. Configure Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteSvg from 'vite-plugin-svelte-svg'

export default defineConfig({
  plugins: [
    svelteSvg({
      dir: 'src/svg',
      typesOutput: 'src/type/svg.d.ts'
    }),
    svelte()
  ]
})
```

### 2. Use the Component

```svelte
<script lang="ts">
  import { Svg } from '@/type/svg'  // Auto-generated with typed name prop
</script>

<!-- Basic usage -->
<Svg name="icon" />

<!-- With size -->
<Svg name="logo" size="64px" />

<!-- With single color -->
<Svg name="arrow" color="#ff0000" />

<!-- With multiple colors (for multi-colored SVGs) -->
<Svg name="badge" color={['#fff', '#000', '#ccc']} />

<!-- With class and click handler -->
<Svg 
  name="button" 
  size="24px" 
  class="hover:opacity-80 cursor-pointer"
  onclick={() => console.log('clicked')}
/>
```

## API

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dir` | `string` | `'src/svg'` | SVG files directory |
| `typesOutput` | `string` | `'src/type/svg.d.ts'` | TypeScript types output path |
| `generateTypes` | `boolean` | `true` | Whether to generate types |

### Svg Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `SvgName` | required | SVG file name (without extension), auto-completed |
| `size` | `string \| number` | `'40px'` | Width and height |
| `color` | `string \| string[]` | `undefined` | Fill color(s) for shapes |
| `class` | `string` | `''` | CSS classes |
| `...rest` | `HTMLAttributes` | - | All HTML attributes and events |

### Generated File

The plugin generates a single `svg.ts` file containing:

```ts
export type SvgName = 'icon1' | 'icon2' | ...  // Union of all SVG names
export interface SvgProps { ... }               // Typed props interface
export const Svg: Component<SvgProps>           // Typed Svg component
```

## How It Works

1. **Build/Dev start**: Plugin scans SVG directory and generates `svg.ts` with typed `Svg` component
2. **Dev time**: Watches for SVG file changes and regenerates with HMR
3. **Runtime**: SVGs are loaded as base64 data URLs via `import.meta.glob`, then parsed and modified in the browser

## License

MIT
