import type { SvgGlobResult, SvgRegistry } from '../types'
import { setSvgRegistry } from './Svg.svelte'

/**
 * Initialize SVG registry from glob import result
 * @example
 * import { initSvg } from 'vite-plugin-for-svelte-svg/runtime'
 * initSvg(import.meta.glob('./your-svg-dir/*.svg'))
 */
export function initSvg(globResult: SvgGlobResult): SvgRegistry {
  const registry = Object.entries(globResult).reduce((acc: SvgRegistry, [path, loader]) => {
    const lastSlashIndex = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
    const name = path.slice(lastSlashIndex + 1, -4)?.toLowerCase() ?? null
    if (name !== null) {
      acc[name] = loader
    }
    return acc
  }, {})
  
  setSvgRegistry(registry)
  return registry
}
