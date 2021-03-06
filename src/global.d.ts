/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />

interface ImportMetaEnv {
  [key: string]: string | boolean
}

interface ImportMeta {
  globEager<Module = { [key: string]: unknown }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  namespace Post {
    interface Article {
      layout: 'article'
      cover?: string
      coverText?: string
      toc?: false | Article.Toc[]
    }
    namespace Article {
      interface Toc {
        depth?: number
        title?: string
        slug?: string
        children?: Toc[]
      }
    }
    interface Note {
      layout: 'note'
    }
    interface Photo {
      layout: 'photo'
      cover?: string
    }
    interface Reply {
      layout: 'reply'
      /** u-in-reply-to */
      inReplyTo?: string | string[]
    }
    interface Common {
      /** post path - auto generated */
      path?: string
      /** post slug - auto generated */
      slug?: string
      /** created time - auto generated or set manually */
      created?: string
      /** updated time - auto generated or set manually */
      updated?: string
      /** published time */
      published?: string
      /** post title */
      title?: string
      /** post summary */
      description?: string
      /** post summary */
      summary?: string
      /** post tags */
      tags?: string[]
      /** enable some advanced features.
       * @property hidden - deprecated, transfer to `unlisted`
       * @property unlisted - hide this post from the homepage and feed.
       * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
       * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
       */
      flags?: string[]
      series_title?: string
      series_name?: string
      series_color?: string
      banner?: string
    }
    type Metadata = Common & (Article | Note | Photo | Reply)
    interface Module {
      default: { render: () => { html: string; head: string; css: { code: string } } }
      metadata: Metadata
    }
  }
  type Post = Post.Metadata & { html?: string }
  type Page = { title?: string; path: string }
}
