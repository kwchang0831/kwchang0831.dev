<script lang="ts">
  let className = undefined
  export { className as class }
  export let src: string
  export let alt: string = src
  export let loading: 'eager' | 'lazy' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
  export let figcaptionClass: string = 'italic'
  export let w = undefined
  export let h = undefined
</script>

<figure class="flex flex-col w-auto mx-4 md:mx-0">
  <picture>
    <img
      data-zoomable
      {src}
      {alt}
      itemprop="image"
      class="{w ? '' : 'w-full h-auto'} z-50 u-photo {className ?? 'rounded-lg my-2'}"
      width={w}
      height={h}
      {loading}
      {decoding} />
  </picture>

  {#if $$slots.default}
    <figcaption class={figcaptionClass}>
      <slot />
    </figcaption>
  {/if}
</figure>
