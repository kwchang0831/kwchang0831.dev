---
title: 使用 Svelte + Urara 重新架設我的網站
description: 紀錄新網站上架與舊網站的搬遷過程。 大略介紹 JAMStack 、 NextJS 與 Svelte 的靜態網站生成器 (SSG)。
summary: 簡略介紹 JAMStack 和 NextJS 與 Svelte 的靜態網站生成器 和 新網站上架
cover: ./cover.webp
coverStyle: NONE
published: 2022-05-05 GMT08:00
updated: 2022-05-05 GMT08:00
tags:
  - Year: 2022
  - Language: 中文
  - Blog
  - Urara
  - NextJS
  - Vercel
  - CloudFlare
---

<script lang="ts">
  import Github from '$custom/github.svelte'
</script>

## 開始

半年多前，我決定了要開始我的網誌寫作之旅。

主要是為了記錄學習過程，並把學習到的知識整理起來，並透過寫作的方式來強化自己的表達能力。

當時我並不確定應該用甚麼來做比較好。我唯一比較明確知道的是，我不想用 [Wordpress](https://wordpress.com/zh-tw/), [Medium](https://medium.com/) 等等之類的發佈平台。我想要擁有一個屬於自己的空間，盡量能夠掌控所有能掌握的細節。除此之外，我希望網站的讀取速度要夠快。根據我過去的實際體驗來看，上述兩家的發佈平台讀取速度我完全不能接受，而且版面設計大同小異。雖說 Wordpress 可以自己架設更改模板與插件，但那個效能真的是不忍直視。

再來就是，我覺得既然身為熱愛學習的技術宅，能夠自行架設並且客製化自己的網站，我這是一種付諸實踐的行動證明，也能在其中磨練自我的技術能力。如此美好與快樂的事情，何樂而不為呢?

所以在最後，我決定研究看看那夯了一陣子的 [JAMstack](https://jamstack.org/)。

## JAMStack

容我簡略介紹一下，[JAMStack](https://jamstack.org/) 是一個開發架構，核心概念就是 **提前生成 (Pre-render / Pre-generate)** 與 **去耦合 (Decoupling)**，標榜更快速地、更安全地、與更簡單地擴縮來提供服務。

而 [JAMStack](https://jamstack.org/) 主要是由以下三個要素組成：

- [ J ] JavaScript : 讓網頁具有更多的功能性
- [ A ] APIs : 讓網頁具有可溝通的服務性
- [ M ] Markup : 網頁的內容

**提前生成** 就是我們在 Build (建置) 階段，準備 Deploy (部署) 之前，就會把所有需要的網頁都生成好了。不會說等到已經上線才根據使用者的需求找從資料庫拉資料把網頁拼出來。換句話說，[JAMStack](https://jamstack.org/) 架構並不需要後端伺服器。同學你可能聽過的 SSG (Static Site Generator) - 靜態網站生成器。SSG 就是用來生成 [JAMStack](https://jamstack.org/) 網站的工具。幾個其中比較有名的幾個就是 [NextJS](https://nextjs.org/) 與 [Hugo](https://gohugo.io/)，更多的清單可以參考 [Site Generators](https://jamstack.org/generators/)。

**去耦合** 就是減低系統與系統之間依賴性。對於 [JAMStack](https://jamstack.org/) 而言，具體就是要把 frontend (前端) 與 backend (後端) 分離開來，減少彼此的依賴性。我們讓後端可以分離成單獨的服務，只有**提前生成**才會讀取資料，或是完全拋棄後端只使用靜態的資料進行**前提生成**。

我們可以參考下圖：
![jamstack02.avif](./jamstack02.avif)

我們先看到圖片中左邊的部分：React + NextJS + GraphQL。NextJS 是建立在 React 的框架，然後使用 GraphQL 語言來對 API 進行溝通。這邊就是我們的 SSG - 靜態網站生成器的部分。

我們再來看到圖片中間最下部分。當我們完成內容更新，我們會把 SSG 都上傳 (Check in) 到 Github 專案託管。這時候有連動的無伺服器 CI/CD 平台 Netlify，就會從 Github 抓取 (Check out) 專案來執行 Build 與 Deploy 的動作。

圖片往上一點。看到右側的 Headless CMS (Content Management System) ，它是選擇性的。它是一個不對外顯示但可以讀取與儲存資料用的內容管理系統(CMS)。所以基本上，Headless CMS 是需要後端伺服器與資料庫的。舉例來說，Wordpress 是一個 CMS，如果我們不用 Wordpress 來給使用者顯示內容，只是使用存在 Wordpress 裡的資料的話，就可以把它當成 Headless CMS 來用。這邊也就是我們之前提到的**去耦合**。把前端與後端分離開來。

這時，如果 SSG 有設置要從 Headless CMS 讀取資料的話，那在 Netlify 在建置過程中就會去抓取 Headless CMS 裡的資料來完成**提前生成**的頁面。

接下來， Netlify 會把已經**提前生成**好的靜態網站，丟去 CDN (Content Delivery Network) 上讓全世界各地都有你的靜態網站備份，讓使用者讀取時可以優先從離使用者距離比較近的伺服器取得你的靜態網站。

Cloud Function 的部分我這邊就略過介紹，因為我並沒有碰得很深。

總而言之，透過 [JAMStack](https://jamstack.org/) 架構與 SSG，我們可以更簡單地更快速地來部署靜態網站。透過**提前生成**，使用者想要甚麼頁面可以很快速地回應，不需要再做其他處理。並且受惠於 CDN ，讓使用者收到回應的時間更加地縮短。以上就是我目前初淺的理解。

## 之前的網站

我最一開始架設網站使用的是 NextJS 的 SSG 功能來建置的，當時我在 Github 上找到一個很不錯的模板：

<Github user="timlrx" repo="tailwind-nextjs-starter-blog"/>

效能非常好。

這邊分享一下 PageSpeed Insights 的跑分：

![https://raw.githubusercontent.com/gist/kwchang0831/b7b9741ca9380b77cb1088a598ca5e27/raw/c61a411b2db100a155cffe746c921aeb00823491/metrics.pagespeed.svg](https://raw.githubusercontent.com/gist/kwchang0831/b7b9741ca9380b77cb1088a598ca5e27/raw/c61a411b2db100a155cffe746c921aeb00823491/metrics.pagespeed.svg)

[Web Page Test](https://www.webpagetest.org/) 測試跑分：

![blog1-01.avif](./blog1-01.avif)

我是架設在 [Vercel](https://vercel.com/) 上，網址是：

- [blog.kwchang0831.dev](https://blog.kwchang0831.dev/)
- [kwchang0831-blog.vercel.app](https://kwchang0831-blog.vercel.app)

不過我已經設定讓 `blog.kwchang0831.dev/blog/*` 轉址至 `kwchang0831.dev/*` 。也就是目前這個網站。

轉址的部分，我是使用 [CloudFlare Workers](https://workers.cloudflare.com/) 來處理，我並沒有用單純的 URL Rewrite。主要是因為新網站網址的路徑方式已經都不一樣，而且沒有固定規則。舉例來說 `"/blog/photoprism/install-guide" -> "/photoprism"`。那，為了不讓目前有連結到我舊網誌網址的連結失效，所以我必須手動設定個別轉址的設定。

第二個網址，我會繼續保留。這樣我之後還可以回去進行效能對比。

## 現在這個網站

先附上目前的成績，效能一樣非常好。甚至比以前稍微好一些，而且功能性更多更好。

這是 PageSpeed Insights (目前最新更新的跑分)：

![https://raw.githubusercontent.com/gist/kwchang0831/f8a0fbde08b5cd6204438a90e222743e/raw/1daad5cd8b363649a06649a05b56b2d03c3e2aed/metrics.pagespeed.svg](https://raw.githubusercontent.com/gist/kwchang0831/f8a0fbde08b5cd6204438a90e222743e/raw/1daad5cd8b363649a06649a05b56b2d03c3e2aed/metrics.pagespeed.svg)

[Web Page Test](https://www.webpagetest.org/) 的跑分：
![blog2-01.avif](./blog2-01.avif)

去年研究的過程中，我曾經看到 Svelte 前端編譯器這酷東西。粗略瀏覽過，它的開發方式讓我耳目一新。我一直惦記在心裡，希望以後有時間要來玩看看。

它很常會被拿來跟 React、Angular、Vue 這些老牌前端框架做速度比對。像說下圖：
![svelte-01.avif](./svelte-01.avif)

這邊可以看到更多前端框架的比較: [krausest/js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html)

然後，最近我剛好逛到了 [SvelteThemes](https://www.sveltethemes.dev/) 這個網站，發現了 [Urara](https://www.sveltethemes.dev/article/urara) 這個模板 (Template)。

<Github user="importantimport" repo="urara"/>

版面設計與功能都非常合我的胃口。二話不說，我馬上就下載來嘗試看看了。

這邊附上作者的設計理念解說，有興趣的同學可以看看: [https://kwaa.dev/intro-urara](https://kwaa.dev/intro-urara)

如果想嘗試看看的話，同學們可以參考這篇安裝流程： [Urara - 用 Svelte 打造的靜態網站生成器 ; 來架個超快的網誌](/svelte-urara)。

## 更新與變動

現在更換網誌系統後，對比以前的網站設計上不但更簡潔，功能上也更進步了。

我這邊列出一些比較重要的更新與變動：

### 標籤 TAG 與 搜尋

這是用來在首頁快速過濾所有的文章。

過去只能選擇單一一個標籤來過濾文章，現在可以選擇多個標籤來過濾文章。雖然過去的標籤過濾功能搭配上搜尋條無可挑剔，現在的多標籤過濾功能並沒有搜尋條，但我還是比較喜歡現在的設計呈現，而且是在同頁面下進行過濾，不會再另外換到新的頁面。

搜尋功能的話目前網頁右上角有搜尋按鈕可以使用。輸入後會使用 DuckDuckGo 第三方搜尋引擎來找資料。這個搜尋按鈕或許以後可以改成用 [Algolia](https://www.algolia.com/) 來實現更好的網站內資料搜尋。

### 網址路徑

過去所有文章都會放在 `/blog/*` 底下，現在變成我可以在 `/*` 下自由決定。

### 目錄 TOC (Table of Content)

這是文章內的目錄。

過去是用 MDX 的方式顯示在內文的頂端。現在的設計是在網頁右邊浮動與內文分開，隨時可以看到文章的進度。這是我覺得最重要的功能之一。

### 圖片 Lightbox

這功能是讓使用者在讀文章的時候，可以點擊圖片放大獨立顯示。

過去我並沒有這個功能，現在已經放上去了。雖然不近完美，無法在放大之後進行移動或再次放大縮小。但先這樣吧。

### 網頁流量分析

過去我是用 Goolge Analytics(通用)。

現在改成自己架設 [Umami](https://umami.is/)。改成 [Umami](https://umami.is/) 之後就不用擔心被使用者的 ad-blockers 擋住，而且它的追蹤 script 非常小不會影響到用戶的使用體驗。最重要的當然還是隱私保護，所有的流量分析的資料都不會外流給第三方。

### CloudFlare DNS

這次我把 DNS 改放到 [CloudFlare](https://www.cloudflare.com/) 下來管理，也順便把 DNSSEC (域名系統安全擴充) 打開了。除此之外，CloudFlare 有一些速度優化與 Cache 優化的功能，我也通通都給它開起來。

### CloudFlare Workers

這次我也嘗試了 [CloudFlare Workers](https://workers.cloudflare.com/)，用來轉址把舊的網誌轉移到新的網誌。 [CloudFlare Workers](https://workers.cloudflare.com/)是在介於從使用者到網站的最後一環節，如下圖：

![fig01.avif](./fig01.avif)

這也是我第一次寫 Worker 這東西，語言用的是 Javascript。官方教學文件寫得都很清楚，所以也沒遇到甚麼障礙。

大致上邏輯是這樣的，僅供參考。

```js
async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const { pathname, search } = requestURL
  const dest = transformURLs.get(pathname) ?? pathname ?? ''
  const destURL = NEW_URL + dest + (search ?? '')
  return Response.redirect(destURL, 301)
}

addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request))
})
```

## 心得

其實阿，前面的那些更新在第一個網站也都是可以實現的。畢竟 NextJS 是建立在 React 上，然後 React 生態系相對於 Svelte 大很多，有很多已經寫好的插件都可以直接拿來用。只要稍微改一下就可以了。

但是，我還是毅然決然地換成了 Urara 。我說，是人就是需要一點衝動，一些火花，來嘗試新東西，同學你說對嗎？

後續搬家的過程很順利，就把圖片檔案與用 Markdown 語法撰寫的 `.md` 文章本體搬過來。稍微檢查一下文章的 metadata 寫法，然後移除沒有實作的 MDX 插件就完成了。

## 最後

非常感謝大家花時間讀我的小文章。

如果有任何問題，還望不吝指教。

## 完結
