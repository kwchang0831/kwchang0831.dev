---
title: 'Phoenix 1.6+ 搭配 DartSass + Tailwind + DaisyUI (ESbuild)'
description: 本篇文章示範如何在新建立的 Phoenix 1.6+ (ESbuild) 的 Project 裡整合 DartSass + TailWind + DaisyUI。透過 DartSass 整合所有 CSS/SCSS 輸出後，再讓 Tailwind 做最後處理輸出。
summary: 透過 DartSass 整合所有 CSS/SCSS 輸出後，再讓 Tailwind 做最後處理輸出
published: 2022-05-26 GMT08:00
updated: 2022-05-26 GMT08:00
cover: ./cover.webp
coverStyle: NONE
tags:
  - Elixir
  - Phoenix
  - Tailwind
  - DartSass
  - DaisyUI
---

## 開頭

本篇文章示範如何在新建立的 Phoenix 的 Project 裡整合 DartSass + Tailwind + DaisyUI。

主要是透過 DartSass 整合所有 CSS 與 SCSS 檔案之後輸出給 Tailwind ，讓 Tailwind 做最後的處理輸出。

我們會安裝以下

- [Mix Task for DartSass](https://github.com/CargoSense/dart_sass)
- [Mix Task for Tailwind](https://github.com/phoenixframework/tailwind)
- [DaisyUI](https://www.npmjs.com/package/daisyui)

## 環境配置

```shell
❯ elixir -v
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Elixir 1.13.4 (compiled with Erlang/OTP 25)
```

```shell
❯ mix phx -v
Phoenix v1.6.9
```

```shell
❯ node -v
v18.0.0
```

```shell
❯ pnpm -v
7.1.5
```

## 創建 Phoenix Project

Shell 輸入以下，創建一個名叫 `pdtd` 的 Phoenix 專案。

```shell
mix phx.new --no-ecto --no-mailer pdtd
```

<kbd>Enter</kbd> 繼續安裝所有的 dependencies。

若還沒有安裝過 Phoenix，Shell 輸入以下安裝最新版。

安裝 Hex

```shell
mix local.hex
```

安裝 Phoenix

```shell
mix archive.install hex phx_new
```

## 新增 DartSass & Tailwind

### 修改 mix.exs

進入 Project 裡。打開並修改 `mix.exs`。添加 `dart_sass` 與 `tailwind` 至 `deps`。

```elixir
/// showLineNumber
/// hlLines: 15,16
/// title: ./mix.exs
  defp deps do
    [
      {:phoenix, "~> 1.6.9"},
      {:phoenix_html, "~> 3.0"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_live_view, "~> 0.17.5"},
      {:floki, ">= 0.30.0", only: :test},
      {:phoenix_live_dashboard, "~> 0.6"},
      {:esbuild, "~> 0.4", runtime: Mix.env() == :dev},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 0.18"},
      {:jason, "~> 1.2"},
      {:plug_cowboy, "~> 2.5"},
      {:dart_sass, "~> 0.5", runtime: Mix.env() == :dev},
      {:tailwind, "~> 0.1", runtime: Mix.env() == :dev}
    ]
  end
```

修改 `aliases`。

```elixir
/// showLineNumber
/// hlLines: 3,4
/// title: ./mix.exs
  defp aliases do
    [
      setup: ["deps.get", "cmd --cd './assets' pnpm i"],
      "assets.deploy": ["sass default --no-source-map --style=compressed", "tailwind default --minify", "esbuild default --minify", "phx.digest"]
    ]
  end
```

### 修改 config.exs

新增 `dar_sass` 與 `tailwind` 的 config 到 `./config/config.exs`。

```elixir
/// showLineNumber
/// hlLines: 11-25
/// title: ./config/config.exs
# Configure esbuild (the version is required)
config :esbuild,
  version: "0.14.29",
  default: [
    args:
      ~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

config :dart_sass,
  version: "1.52.1",
  default: [
    args: ~w(css/app.scss ../priv/static/assets/app.tailwind.css),
    cd: Path.expand("../assets", __DIR__)
  ]

config :tailwind, version: "3.0.24", default: [
    args: ~w(
      --config=tailwind.config.js
      --input=../priv/static/assets/app.tailwind.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

```

### 修改 dev.exs

新增 `dar_sass` 與 `tailwind` 的 watchers 到 `./config/dev.exs`。

```elixir
/// showLineNumber
/// hlLines: 4-5
/// title: ./config/dev.exs
  watchers: [
    # Start the esbuild watcher by calling Esbuild.install_and_run(:default, args)
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    sass: {DartSass, :install_and_run, [:default, ~w(--embed-source-map --source-map-urls=absolute --watch)]},
    tailwind: {Tailwind, :install_and_run, [:default, ~w(--watch)]}
  ]
```

若是要在 remote 主機上跑 dev 的話，記得順便修改 `http` 設定才能用 `http://{ip}:4000` 的方式查看。

```elixir
/// showLineNumber
/// hlLines: 4
/// title: ./config/dev.exs
config :pdtd, PdtdWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {0, 0, 0, 0}, port: 4000],
```

### 執行 deps 安裝

```shell
mix deps.get
```

### 執行 dart_sass & tailwind 安裝

```shell
mix sass.install
```

```shell
mix tailwind.install
```

### 更新 tailwind / dartSass 版本

若要更新 tailwind / dartSass 的版本，修改 `version` 的參數，然後再執行一次 `mix sass.instal` 或 `mix tailwind.install`。

## 修改 Assets 的 CSS

到 `./assets/css`，重新命名 `app.css` 為 `main.css`，並**移除**裡面所有的 import tailwind。

```css
/// showLineNumber
/// hlLines: 1-3
/// title: ./assets/css/main.css
- @import "tailwindcss/base";
- @import "tailwindcss/components";
- @import "tailwindcss/utilities";

/* This file is for your main application CSS */
...
```

新增 `./assets/css/app.scss` 檔案，並 import tailwind 的元件還有其他所需要的 css 檔案。

```scss
/// title: ./assets/css/app.scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@import 'main';
@import 'phoenix';
```

## 安裝 DaisyUI

到 `./assets/` 目錄底下，輸入以下。

```shell
pnpm i --save-dev daisyui
```

如果有跑出 `missing peer` ，就把缺少的補安裝。

```shell
pnpm i --save-peer autoprefixer@^10.0.2 postcss@">=8.3.3 <9.0.0"
```

## 設定 Tailwind 添加 DaisyUI

打開 `./assets/tailwind.config.js`，新增 DaisyUI 到 `plugins` 裡。

這邊有設定主題改用 `wireframe`，可自行更改。

```js
/// showLineNumber
/// hlLines: 12-16
/// title: ./assets/tailwind.config.js
module.exports = {
  content: ['./js/**/*.js', '../lib/*_web.ex', '../lib/*_web/**/*.*ex'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: ['wireframe']
  }
}
```

## 啟動 dev Server

回到專案的目錄下 `../`。

還記得我們稍早有修改過 mix setup 的 task？

```elixir
setup: ["deps.get", "cmd --cd './assets' pnpm i"],
```

現在執行來確認所有需要安裝的東西都安裝好了。

```shell
mix setup
```

確定都安裝沒問題之後，就可以開啟 dev Server 了。

```shell
mix phx.server
```

接下來，打開 `http://localhost:4000` 或是 `http://{IP}:4000` 就可以看到結果嚕。

## 修改 index.html.heex 查看結果

為了證明我們已經成功完成整合，讓我們修改 `index.html.heex`。

把內容都清除掉，新增以下 [Card component from DaisyUI](https://daisyui.com/components/card/)。

```html
/// title: ./lib/pdtd_web/templates/page/index.html.heex
<section>
  <div class="card lg:card-side bg-base-100 shadow-xl">
    <figure><img src="https://api.lorem.space/image/album?w=400&h=400" alt="Album" /></figure>
    <div class="card-body">
      <h2 class="card-title">~ Welcom to DaisyUI ~</h2>
      <p>Click the button!</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Click</button>
      </div>
    </div>
  </div>
</section>
```

如果 dev server 還開著的話，存檔後就可以看到頁面更新了。如同封面圖一樣。

## 最後

我有創建了一個 Github Repo，有需要完整原始碼的可以去看看。

[kwchang0831/phoenix-dartSass-tailwind-daisyUI](https://github.com/kwchang0831/demo-phoenix-dartSass-tailwind-daisyUI)

## 完結
