import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

import Avatar from '$assets/avatar.png';
import Avatar_128 from '$assets/avatar.png?w=128&h=128&format=avif;webp&imagetools';
import Avatar_48_PNG from '$assets/avatar.png?w=48&h=48&imagetools';
import Avatar_96_PNG from '$assets/avatar.png?w=96&h=96&imagetools';
import Avatar_192_PNG from '$assets/avatar.png?w=192&h=192&imagetools';
import Avatar_512_PNG from '$assets/avatar.png?w=512&h=512&imagetools';

import SiteCover from '$assets/sitecover.png';

export const siteConfig: Site.Config = {
  url: 'https://www.kwchang0831.dev',
  title: '成功他媽．阿瑋',
  subtitle: '成功最終會回來找他媽的',
  description:
    '成功最終會回來找他媽的 👋 | @kwchang0831 - Love to learn new stuff. Master of none. Having fun is all it matters. YOLO!',
  lang: 'zh',
  timeZone: 'Asia/Taipei',
  since: 2021,
  cover: SiteCover,
  author: {
    name: 'kwchang0831',
    status: '❤️',
    statusTip: 'Always Learning...',
    avatar: Avatar,
    avatar_128: Avatar_128,
    avatar_48_png: Avatar_48_PNG,
    avatar_96_png: Avatar_96_PNG,
    avatar_192_png: Avatar_192_PNG,
    avatar_512_png: Avatar_512_PNG,
    website: 'https://www.kwchang0831.dev/',
    github: 'https://github.com/kwchang0831',
    email: 'contact@kwchang0831.dev',
    bio: `Do it. Just do it!<br/>Don't let your dreams be dreams!<br/>`,
  },
};

export const headConfig: Site.Head = {
  me: ['https://github.com/kwchang0831'],
  custom: ({ dev }) =>
    dev
      ? [
          // For Development Enviroment
        ]
      : [
          // For Production Enviroment
          '<link rel="preconnect" href="https://plausible.kwchang0831.dev" />',
          '<script defer type="text/partytown" data-domain="kwchang0831.dev" src="https://plausible.kwchang0831.dev/js/plausible.js"></script>',
          // '<script defer data-domain="kwchang0831.dev" src="https://plausible.kwchang0831.dev/js/plausible.js"></script>',
        ],
};

export const dateConfig: Site.DateConfig = {
  toPublishedString: {
    locales: 'zh-TW',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
  toUpdatedString: {
    locales: 'zh-TW',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
};

export const giscusConfig: Giscus.Config = {
  // src: 'https://giscus.kwchang0831.dev/client.js',
  enable: true,
  id: 'giscus-comment',
  repo: 'kwchang0831/kwchang0831.dev',
  repoId: 'R_kgDOH5F62g',
  category: 'Comments',
  categoryId: 'DIC_kwDOH5F62s4CRFgF',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  lang: 'zh-TW',
  'data-strict': '0',
};

export const navConfig: (DD.Nav | DD.Link)[] = [
  {
    name: '關於我',
    url: '/about',
  },
];

export const mobilenavConfig: DD.Nav = {
  orientation: 2,
  links: [
    {
      name: '關於我',
      url: '/about',
    },
  ],
};
