<script lang="ts">
  import { slide, fly } from 'svelte/transition';
  import TagsCategory from '$lib/components/tags_category.svelte';
  let scrollY = 0;
  let className: any = undefined;
  export { className as class };

  export let expaned = true;
  import { tagsAll } from '$stores/tags';

  function toggle() {
    expaned = !expaned;
  }

  let originalTags = JSON.stringify($tagsAll);
  let curTags = JSON.parse(originalTags);
  let timer: string | number | NodeJS.Timeout | undefined;
  let input: string;
  function handleInput() {
    curTags = JSON.parse(originalTags);

    if (!input || input.length === 0) return;

    curTags.map((c: { tags: any[] }) => {
      c.tags = c.tags.filter((tag) => {
        return tag.name.toLowerCase().includes(input.toLowerCase());
      });
      return c;
    });
    curTags = curTags.filter((c: { tags: any[] }) => {
      return c.tags.length > 0;
    });
  }
  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleInput();
    }, 500);
  };
</script>

<svelte:window bind:scrollY />

{#if $tagsAll.length}
  <aside
    in:fly={{ x: -25, duration: 300, delay: 300 }}
    out:fly={{ x: -25, duration: 300 }}
    id="index-tags"
    class="{className ?? ''} {scrollY > 0 ? 'sticky top-[4rem]' : ''}">
    <div
      class="select-none flex justify-between items-center border-b-2 border-black dark:border-white cursor-pointer"
      on:click={toggle}>
      <h2 class:expaned class="text-2xl my2">Tags</h2>
      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>
    <input
      bind:value={input}
      on:input={debounce}
      placeholder="Filter Tags"
      class="my2 px2 py1 bg-transparent border-2 border-x-2 border-black rounded-b" />
    {#key curTags}
      {#if expaned}
        <div transition:slide={{ duration: 300 }} class="pt2 pb4 select-none">
          {#each curTags as c}
            <TagsCategory data={c} expanded />
          {/each}
        </div>
      {/if}
    {/key}
  </aside>
{/if}
