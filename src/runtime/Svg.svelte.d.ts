import type { SvgRegistry, SvgColor, NumberWithUnit } from '../types'
import type { HTMLAttributes } from 'svelte/elements'

export function setSvgRegistry(registry: SvgRegistry): void
export function getSvgRegistry(): SvgRegistry

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  name: string
  size?: NumberWithUnit
  color?: SvgColor
}

declare const Svg: import('svelte').Component<Props>
export default Svg
