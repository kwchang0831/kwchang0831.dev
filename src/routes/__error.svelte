<script lang="ts" context="module">
  export const load = ({ url: { pathname }, error: { message }, status }) => ({ props: { status, message, pathname } })
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let status: string
  export let message: string
  export let pathname: string
  console.error(status, pathname, message)
</script>

<Head page={{ title: status ?? '404', path: pathname ?? '/404' }} />

<div class="flex flex-col justify-center flex-nowrap xl:flex-row xl:flex-wrap">
  <div class="flex-none w-full max-w-screen-md mx-auto xl:mx-0">
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="z-10 rounded-none shadow-xl card bg-base-100 md:rounded-box md:mb-8">
      <main itemprop="articleBody" class="prose card-body urara-prose">
        <h1 class="opacity-20 text-6xl md:text-[12rem] -mt-2 mb-0">
          {status ?? '404'}
        </h1>
        <h2 class="-mt-12 md:-mt-24">{message ?? 'Not found'}</h2>
        <div class="card-actions">
          <a href="/" class="mt-8 no-underline shadow-xl btn btn-neutral hover:shadow-2xl">
            <span class="mr-2 -ml-1 i-heroicons-outline-home" />
            Back to Home
          </a>
        </div>
      </main>
    </article>
    <Footer sticky={true} class="flex-1 md:flex-initial" />
  </div>
</div>
