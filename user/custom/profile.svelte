<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { siteConfig } from '$config/site';
  export let avatar: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let subname: string | undefined = undefined;
  export let bio: string | undefined = undefined;
</script>

<div
  class="relative w-auto p-4 my-4 overflow-hidden transition-shadow duration-300 shadow-xl gradeient-animation min-h-48 rounded-box bg-gradient-to-b from-primary to-secondary text-primary-content hover:shadow-2xl md:p-8">
  <div class="mb-4 avatar">
    <div class="w-16 h-16 border-2 border-white overflow-hidden rounded-full shadow-xl">
      <img
        class="hover:rotate-[360deg] transition-transform duration-1000 ease-in-out m-0"
        src={avatar ?? siteConfig.author.avatar}
        alt={name ?? siteConfig.author.name}
        loading="lazy"
        decoding="async" />
    </div>
  </div>
  {#if subname}
    <div class="opacity-75">{subname}</div>
  {/if}
  <div class="mb-2 text-2xl">{name ?? siteConfig.author.name}</div>
  {#if bio || siteConfig.author.bio}
    <div>{@html bio ?? siteConfig.author.bio}</div>
  {/if}
  <slot />
  <div class="flex flex-col gap-4 mt-4 md:flex-row">
    {#if siteConfig.author.github}
      <a
        href={siteConfig.author.github}
        rel="noopener external"
        target="_blank"
        class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#5865f2] hover:bg-[#7983f5]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="absolute w-16 h-16 transition-transform duration-600 ease-in-out iconify iconify--mdi right-10 opacity-20 fill-white transform-gpu group-hover:scale-125"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
        </svg>
        <span class="z-10 !text-white">{siteConfig.author.github.replace(/^https:\/\/github.com\//, '@')}</span>
      </a>
    {/if}
    <!-- <a
      href="https://discordapp.com/users/{siteConfig.author.discordID}"
      rel="noopener external"
      target="_blank"
      class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#26a5e4] hover:bg-[#0088cc]">
      <svg
        class="absolute w-16 h-16 transition-transform duration-600 ease-in-out right-10 opacity-20 fill-white transform-gpu group-hover:scale-125"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
      <span class="z-10 !text-white">{siteConfig.author.discordTag}</span>
    </a> -->
  </div>
</div>

<style>
  .gradeient-animation {
    background: linear-gradient(
      140deg,
      rgba(238, 119, 82, 0.75),
      rgba(231, 60, 126, 0.75),
      rgba(35, 166, 213, 0.75),
      rgba(35, 213, 171, 0.75)
    );
    background-size: 400% 400%;

    -webkit-animation: gradient 6s ease 1s infinite alternate;
    -moz-animation: gradient 6s ease 1s infinite alternate;
    -o-animation: gradient 6s ease 1s infinite alternate;
    animation: gradient 6s ease 1s infinite alternate;
  }

  @-webkit-keyframes gradient {
    0% {
      background-position: 4% 0%;
    }
    50% {
      background-position: 97% 100%;
    }
    100% {
      background-position: 4% 0%;
    }
  }
  @-moz-keyframes gradient {
    0% {
      background-position: 4% 0%;
    }
    50% {
      background-position: 97% 100%;
    }
    100% {
      background-position: 4% 0%;
    }
  }
  @-o-keyframes gradient {
    0% {
      background-position: 4% 0%;
    }
    50% {
      background-position: 97% 100%;
    }
    100% {
      background-position: 4% 0%;
    }
  }
  @keyframes gradient {
    0% {
      background-position: 4% 0%;
    }
    50% {
      background-position: 97% 100%;
    }
    100% {
      background-position: 4% 0%;
    }
  }
</style>
