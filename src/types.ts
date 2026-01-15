import type { HTMLAttributes } from 'svelte/elements'

export interface PluginOptions {
  /**
   * SVG files directory (relative to project root)
   * @default 'src/svg'
   */
  dir?: string

  /**
   * Output path for generated TypeScript types
   * @default 'src/types/svg.d.ts'
   */
  typesOutput?: string

  /**
   * Whether to generate types on startup
   * @default true
   */
  generateTypes?: boolean
}

export type SvgBase64 = `data:image/svg+xml,${string}`

export type SvgColor = string | string[] | undefined

export type NumberWithUnit = `${number}${'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'}` | number | string

export interface SvgProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  name: string
  size?: NumberWithUnit
  color?: SvgColor
}

export type SvgModule = () => Promise<{ default: string }>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SvgGlobResult = Record<string, () => Promise<any>>

export type SvgRegistry = Record<string, SvgModule>
