<script lang="ts">
  export let title: string = undefined
  export let description: string = undefined
  export let status: 'info' | 'success' | 'warning' | 'error' = undefined
</script>

<div
  class:alert-info={status === 'info'}
  class:alert-success={status === 'success'}
  class:alert-warning={status === 'warning'}
  class:alert-error={status === 'error'}
  class="flex-col my-4 shadow-inner alert">
  <div class="mr-auto">
    {#if status === 'success'}
      <span class="i-heroicons-outline-check-circle" />
    {:else if status === 'warning'}
      <span class="i-heroicons-outline-exclamation-circle" />
    {:else if status === 'error'}
      <span class="i-heroicons-outline-x-circle" />
    {:else}
      <span class="i-heroicons-outline-information-circle" />
    {/if}
    <div>
      <div class:font-bold={description}>{@html title}</div>
      {#if description}
        <div class="text-xs">{@html description}</div>
      {/if}
    </div>
  </div>
  {#if $$slots.default}
    <div class="block w-full no-margin-p">
      <slot />
    </div>
  {/if}
</div>
