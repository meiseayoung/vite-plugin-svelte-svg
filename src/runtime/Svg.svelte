<script lang="ts" module>
  import type { SvgBase64, SvgColor, NumberWithUnit, SvgRegistry } from '../types'

  let globalRegistry: SvgRegistry = {}

  export function setSvgRegistry(registry: SvgRegistry) {
    globalRegistry = registry
  }

  export function getSvgRegistry(): SvgRegistry {
    return globalRegistry
  }

  function classValue2className(value: string | string[] | Record<string, boolean> | undefined | null): string {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (Array.isArray(value)) return value.filter(Boolean).join(' ')
    if (typeof value === 'object') {
      return Object.entries(value)
        .filter(([_, condition]) => condition)
        .map(([className]) => className)
        .join(' ')
    }
    return ''
  }

  function processSvgHtml(
    svgBase64: SvgBase64,
    color: SvgColor,
    size: NumberWithUnit,
    className: string | undefined
  ): string {
    const svgHtml = decodeURIComponent(svgBase64).replace(/^data:image\/svg\+xml,/, '')
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgHtml, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (!svg) return ''

    const classNameString = classValue2className(className)
    if (classNameString.trim() !== '') {
      classNameString.split(/\s+/).forEach((name) => {
        svg.classList.add(name)
      })
    }

    svg.style.width = String(size)
    svg.style.height = String(size)
    svg.classList.add('shrink-0')

    // Handle color for shape elements
    if (color !== undefined) {
      const shapes = doc.querySelectorAll('rect,circle,path,ellipse,line,polyline,polygon,text')
      if (typeof color === 'string') {
        shapes.forEach((el) => {
          el.removeAttribute('mask')
          el.setAttribute('fill', color)
        })
      } else if (Array.isArray(color)) {
        shapes.forEach((el, index) => {
          if (color[index]) {
            el.removeAttribute('mask')
            el.setAttribute('fill', color[index])
          }
        })
      }
    }

    return doc.documentElement.outerHTML
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    name: string
    size?: NumberWithUnit
    color?: SvgColor
  }

  const {
    name,
    size = '40px',
    color,
    class: className = '',
    ...restProps
  }: Props = $props()

  const promise = $derived.by(() => {
    const loader = globalRegistry[name.toLowerCase()]
    if (loader) {
      return loader()
    }
    return Promise.reject(new Error(`SVG "${name}" not found`))
  })
</script>

{#await promise}
  <span
    data-role="svg-placeholder"
    class={['inline-flex', className].filter(Boolean).join(' ')}
    style="width:{size};height:{size}"
  ></span>
{:then module}
  <i {...restProps}>
    {@html processSvgHtml(module.default as SvgBase64, color, size, className)}
  </i>
{:catch}
  <span data-role="svg-error" hidden></span>
{/await}

<style>
  :global(svg.shrink-0) {
    flex-shrink: 0;
  }
</style>
