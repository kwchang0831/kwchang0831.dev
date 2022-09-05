---
title: 從 Vercel 改成 Netlify 來架設 Urara
description: 在 Vercel deploy Urara 時，build 階段一直卡在 exit code 137 報錯，嘗試修改 max_old_space_size 擴充內存，但無效。 最後改用 Netlify 本地 build 直接 deploy 解決問題。
summary: 在 Vercel 上 build 一直報錯 exit code 137，所以改用 Netlify 來解決問題
published: 2022-05-12 GMT08:00
updated: 2022-05-12 GMT08:00
cover: ./cover.webp
coverStyle: NONE
tags:
  - Blog
  - Urara
  - Netlify
  - Vercel
---

## 開始

## 問題情況

最近在 Deploy 本網站到 Vercel 的時候會碰到

```shell
/// hlLines: 3,5
sh: line1: 1303 killed svelte-kit build
ELIFECYCLE command failed with exit code 137.
ERROR: "build:kit" exited with 1.
ELIFECYCLE command failed with exit code 1.
Error: Command "pnpm run build" exited with 1
```

本地執行 build 的時候並不會發生

```shell
pnpm build
...
Run npm run preview to preview your production build locally.
> Using @sveltejs/adapter-static
  Wrote site to "build"
  ✔ done
```

只有在 Vercel 上進行 build 的時候會發生這 `exit code 137` 的錯誤。

## 問題分析

嘗試在 Google 上找尋答案。大部分人的回覆都是說因為建構時內存記憶體不足，所以 NodeJS 崩潰彈出錯誤。但我還是找不太到很肯定的答案到底為甚麼會發生此錯誤與能成功幫我解決的方案。

目前 Urara 的 build script 中，有添加系統變數，來擴展內存記憶體至 7GB，才進行 build。

```json title="package.json"
"build:kit": "export NODE_OPTIONS=--max_old_space_size=7680 && svelte-kit build"
```

如果去除了這個`NODE_OPTIONS=--max_old_space_size=7680`這個系統變數之後來進行 build 的話，會遇到 `Javascript heap out of memory` 的錯誤。

```shell {1,3}
Aborted (core dumped)
ELIFECYCLE  Command failed with exit code 134.
ERROR: "build:kit" exited with 1.
ELIFECYCLE  Command failed with exit code 1.
```

以下是我目前的執行環境：

```shell
❯ neofetch
            .-/+oossssoo+/-.               jack@jack-dev
        `:+ssssssssssssssssss+:`           -------------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04 LTS x86_64
    .ossssssssssssssssssdMMMNysssso.       Host: BHYVE 1.0
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-27-generic
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 2 hours, 31 mins
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1953 (dpkg), 10 (snap)
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: zsh 5.8.1
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Terminal: /dev/pts/1
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   CPU: Intel Xeon D-1541 (12) @ 2.098GHz
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: 00:1d.0 Vendor fb5d Device 40fb
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Memory: 1624MiB / 32104MiB
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        `:+ssssssssssssssssss+:`
            .-/+oossssoo+/-.
```

根據 Vercel 官方手冊 [Build Step #Memory](https://vercel.com/docs/concepts/deployments/build-step#memory)：

> Every Build is provided with 8192 MiB of memory.

每次建構的時候可以使用最多 8GB 的記憶體。

## 嘗試處理

我嘗試過更改 `--max_old_space_size` 至 8192 ，但是還是會遇到 `exit code 137`。

也嘗試過改用 Netlify 來進行 deploy，都還是無法解決。

目前已知的，

- 本地進行 build 正常
- Vercel 平台上 build 會報錯
- Netlify 平台上 build 會報錯

以上的 Vercel 與 Netlify 都是 link 到 Github 的原始碼，當有新的 commit 的時候才進行下載 > build > deploy。

## 解決方式

既然知道 本地 build 是正常的，只有在平常上 build 才會報錯。那我就改用 Netlify 才有支援的本地 build 功能。在本地建構完成之後直接 deploy，問題就解決了。

這邊列出流程：

### Netlify Local Build

安裝 Netlify CLI

```shell
npm install netlify-cli -g
```

查看可用指令

```shell
netlify
```

登入 Netlify 帳號

```shell
netlify login
```

登入完成之後，查看狀態

```shell
netlify status
```

在 Netlify 創建一個新的網站
這指令要在你專案的路徑裡執行，也就是包含 `package.json` 的這個層級。

```shell
netlify sites:create
```

創建完成之後，在你的專案資料夾裡面應該會看到新增了 `.netlify` 資料夾，裡面有一個 `state.json`。這個檔案會記錄你這個專案與 Netlify 上要 deploy 網站的 `siteId`。

接下來，就可以進行本地 build 了

```shell
netlify build
```

Build 完成之後，你可以 deploy 一個來 preview 看看

```shell
netlify deploy
```

Preview 完成，確認都沒問題之後，就可以正式上線

```shell
netlify deploy --prod
```

## 完結
