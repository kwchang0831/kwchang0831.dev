---
title: '02. Elixir 學習 - 跨出第一步'
description: 讓我們一起學 Elixir 系列。 02. Elixir 學習 - 跨出第一步。 簡短介紹 Elixir 與 免費的學習資源。之後就開始動手來撰寫第一個 Elixir 程式。
summary: 簡短介紹 Elixir 與 開始動手來撰寫第一個 Elixir 程式
published: '2022-05-18T00:00:00.000+08:00'
updated: '2022-05-18T00:00:00.000+08:00'
cover: ./cover.webp
coverText: 'Cover Photo by <a href="https://unsplash.com/@aamir_in?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" rel="nofollow noopener noreferrer external" target="_blank">Aamir Suhail</a> on <a href="https://unsplash.com/photos/ATlRqTCbvV4" rel="nofollow noopener noreferrer external" target="_blank">Unsplash</a>'
series_tag: 'Learn-Elixir'
series_title: ⚡ 讓我們一起學 Elixir 🧪
tags:
  - Elixir
---

## 開頭

每個人學習方式都不盡相同。

或許很多人會建議你應該提前做準備，先做好各種理論的學習。希望能讓你避開問題，從而減少失敗。但，那些建議真的能夠讓你避開所有問題嗎? 還是只是讓你緩慢地失敗，到後來失敗之後反而不知所措，一蹶不振。

對我來說，我喜歡的學習方式是 [Learning by Doing](https://en.wikipedia.org/wiki/Learning-by-doing) 與 Fail Fast。直接開始做就對了，錯了也沒關係。我希望更早遇到錯誤與失敗，在每次失敗之後與修正失敗之後，我站起來的腳步也會越來越來穩固。

當然，這不一定適合所有人。但，歡迎參考。

<ImgZoom src="/elixir/start/fig01.webp" width="1050" height="549">

Figure 01. by [Aaron Davis](https://www.flickr.com/photos/aaron_davis/16453803047)

</ImgZoom>

## 為甚麼要學習 Elixir?

因為好玩。學習就是快樂的泉源。難道你已經忘了小時候那最純粹的快樂了嗎?

<ImgZoom src="/elixir/start/fig02.webp" width="833" height="477">

Figure 02. by [Ben White](https://unsplash.com/@benwhitephotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/4K2lIP0zc_k)

</ImgZoom>

## 簡略介紹 Elixir

> Elixir 是一個基於 Erlang 虛擬機器的函數式、面向並列的通用程式語言。Elixir 以 Erlang 為基礎，支援分散式、高容錯、即時應用程式的開發，亦可通過巨集實現元程式設計對其進行擴充，並通過協定支援多型。
>
> -- [Wikipedia](https://zh.wikipedia.org/zh-tw/Elixir)

Elixir 是一個需要編譯的程式語言 (Compiled)，但用起來可以像直譯式語言一樣 (Interpreted)，可以在 Shell 直接執行指令馬上就可以得到回應，像 Python 一樣。

Elixir 是函數式類型的語言，程式的組成都是使用函數 (Functions)，並不需要學習甚麼 OO 物件導向概念。 再來就是 Elixir 中的變數 (Variables) 都是不可變動的 (Immutable)。在撰寫並行運算的時候相對於其他語言簡單許多，不需要擔心變數何時會被其他線程串改。

Elixir 擴充性很高，最好的證明就是 Elixir 本身有 90% 以上都是用自己寫出來。

去看看 "[Elixir 原始碼庫](https://github.com/elixir-lang/elixir)"。

<ImgZoom src="/elixir/start/fig03.webp" width="322" height="112"/>

## Elixir 可以用來幹嘛?

Elixir 可以用來做後端伺服器 (Back End) 或是全端的網頁 (Full Stack Web) 甚至嵌入式系統 (Embedded) 與 IoT 相關的都有。若是不知道前面說的那些是甚麼東西，無所謂，反正學下去就知道可以幹甚麼了。

這邊就給一個著名的例子，聊天軟體 Discord 的後端伺服器是用 Elixir 打造的：
[Real time communication at scale with Elixir at Discord](https://elixir-lang.org/blog/2020/10/08/real-time-communication-at-scale-with-elixir-at-discord/) 。

若想知道更多有哪些公司有在用 Elixir，請參考 [Elixir 案例](https://elixir-lang.org/cases.html)。

## Elixir 的學習資源

網上有很多資源可以學習 Elixir，要花錢的學習資源我這邊就都略過了。

我這邊整理出一些免費的學習資源給各位參考。

- [elixir-lang.org](https://elixir-lang.org/getting-started/introduction.html)

  官方指南。只有英文。內有說明加上範例。

- [Elixir School](https://elixirschool.com/zh-hant/lessons/basics/basics)

  學習手冊。有中文。可以拿來跟官方指南一起用，相輔相成。

- [Exercism](https://exercism.org/tracks/elixir)

  提供練習題目，直接動手寫碼來學習語言的平台。雖然沒有中文，但這平台可以讓你的學習速度倍增。

除此之外，還可以透過 [Github](https://github.com/search?q=learn+elixir) 上搜索別人的專案來參考學習，例如：

- [seven1m/30-days-of-elixir](https://github.com/seven1m/30-days-of-elixir)

  30 天自我學習的紀錄，或許對你有幫助。

- [kwchang0831/path-learning-elixir](https://github.com/kwchang0831/path-learning-elixir)

  沒錯，這是我的學習紀錄。我也還正在用空閒的時間學習中。

## IDE

我主要使用的是 [Visual Studio Code](https://code.visualstudio.com/)，若你熟悉其他 IDE ，請隨意。

### VSCode 插件

- [ElixirLS](https://marketplace.visualstudio.com/items?itemName=JakeBecker.elixir-ls)

  稍微改一下 ElixirLS 的設定

  <kbd>Ctrl + Shift + P</kbd>

  打開 `Preferences: Open User Setting`

  可以直接修改 `json` 或是使用 UI 的方式來更改以下設定。

```json
"elixirLS.suggestSpecs": false,
"elixirLS.dialyzerEnabled": true,
"elixirLS.signatureAfterComplete": false,
"elixirLS.fetchDeps": false,
```

## 環境確認

查看已安裝 Elixir 版本

```shell
elixir -v
```

結果

```shell
❯ elixir -v
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Elixir 1.13.4 (compiled with Erlang/OTP 25)
```

## Hello World

依造[慣例](https://zh.wikipedia.org/wiki/Hello_World)，我們第一件事情就是寫個程式來輸出 `Hello World` 到螢幕上。

### 使用 iex

iex 是 Elixir 的 [REPL](https://zh.wikipedia.org/zh-tw/%E8%AF%BB%E5%8F%96%EF%B9%A3%E6%B1%82%E5%80%BC%EF%B9%A3%E8%BE%93%E5%87%BA%E5%BE%AA%E7%8E%AF) interactive shell (互動式的 shell)

打開 shell，啟動 iex

```shell
iex
```

結果

```shell
❯ iex
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Interactive Elixir (1.13.4) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```

查看幫助，輸入

```shell
iex(1)> h
```

輸出 `Hello World` 的程式碼

```shell
iex(2)> IO.puts "Hello World"
Hello World
:ok
iex(3)>
```

`IO.puts "Hello World"` 這裡面的 `IO` 是一個內建 module。裡面有一個 function `puts` ，可以讓我們把輸入的字串印列到電腦螢幕上。

若想了解更多有關 `IO` 這個 module，

第一種方式，可以使用 iex 的 `h`

```shell
iex(3)> h IO
```

第二種方式，到 Elixir 的 [hexdocs](https://hexdocs.pm/) 上查看

- [https://hexdocs.pm/elixir/IO.html](https://hexdocs.pm/elixir/IO.html)

接下來我們來嘗試用其他方法來寫 Hello World 吧。

結束 iex，目前我們直接 <kbd>Ctrl + C</kbd> 兩次就好了。

### 使用 elixir 執行 `helloWorld.ex`

接下來我們會創建一個 `.ex` 的文檔來寫 Hello World。

#### `.ex` 與 `.exs` 的差別

`.ex` 與 `.exs` 都是 Elixir 所使用的副檔名。差別只是 `.ex` 會經過編譯，而 `.exs` 會像 script 檔案一樣不經過編譯直接執行。我們暫時不需要去深究。

建立 `helloWorld.ex` ，輸入以下後存檔

```elixir
/// title: helloWorld.ex
IO.puts "Hello World"
```

在文檔的路徑打開 shell 輸入

```shell
elixir helloWorld.ex
```

結果

```shell
❯ elixir helloWorld.ex
Hello World
```

### 使用 iex 執行 `helloWorld.ex`

使用 iex 來跑剛剛建立的 `helloWorld.ex`

```shell
iex helloWorld.ex
```

結果

```shell
❯ iex helloWorld.ex
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Hello World
Interactive Elixir (1.13.4) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```

先別結束 iex ，我們打開 `helloWorld.ex` 修改一下後存檔

```elixir title="helloWorld.ex"
IO.puts "Hello World 2"
```

回到 iex

```shell
iex> c "helloWorld.ex"
```

結果

```shell
iex(1)> c "helloWorld.ex"
Hello World 2
[]
iex(2)>
```

`c` 這個 function 可以讓我們重新編譯指定的檔案。

若要查看更多說明：

```shell
iex> h c
```

#### Optional parentheses

有些同學可能會疑問，呼叫 function 的時候不用括號 `()` 嗎? 為甚麼不是 `c("helloWorld.ex")`? 答案是可加可不加，這邊最主要是為了讓各位同學少打幾個字元。更多細節，請參考: [#Optional parentheses](https://hexdocs.pm/elixir/syntax-reference.html#optional-parentheses)。

### 使用 mix 創建 project

接下來，我們來嘗試創建一個 Hello World 的專案

```shell
mix new helloworld
```

這樣會創建一個 `helloworld` 的資料夾，接下來我們到 `helloworld/lib`，可以在 `lib` 的資料夾中看到檔案 `helloworld.ex`。

```elixir
/// title: "helloworld.ex"
defmodule Helloworld do
  @moduledoc """
  Documentation for `Helloworld`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Helloworld.hello()
      :world

  """
  def hello do
    :world
  end
end
```

預設已經幫我寫好了一個 `module` 與 `function`，在 `@doc` 裡面也有範例告訴我們如何使用，我們來試試看。

在 `helloworld` 資料夾裡打開 shell ，輸入以下指令可以讓我們用 iex 來打開這個專案

```shell
iex -S mix
```

結果

```shell
❯ iex -S mix
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Compiling 1 file (.ex)
Interactive Elixir (1.13.4) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```

我們來測試看看

```shell
iex> Helloworld.hello()
```

結果

```shell
iex(1)> Helloworld.hello()
:world
iex(2)>
```

如同 `@doc` 裡寫的一樣，這個 `hello()` function 會輸出 `:world`

先不關閉 iex，我們來修改 `helloworld.ex`，在最後新增一行 `IO.puts "Hello World"`

```elixir
/// title: helloworld.ex
/// showLineNumber
/// hlLines: 18
defmodule Helloworld do
  @moduledoc """
  Documentation for `Helloworld`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Helloworld.hello()
      :world

  """
  def hello do
    :world
  end
end
IO.put "Hello World"
```

然後回到我們的 iex ，輸入以下指令重新編譯

```shell
iex> recompile
```

結果

```shell
iex(2)> recompile
Compiling 1 file (.ex)
Hello World
:ok
iex(3)>
```

我們又輸出了 `Hello World` 了。

## 總結

本篇文章最主要就是用 Elixir 來寫一個能在電腦螢幕上顯示 `Hello World` 字串的電腦程式。

我們嘗試了 `IO` 這個 module 裡的 `puts` function 來做出我們的程式。

也用了以下很多不同的方式來跑這個程式

- iex
- elixir
- mix

## 最後

我想說，還是自己動手學最棒了!

<ImgZoom src="/elixir/start/fig04.webp" width="1920" height="1280">

Figure 04. by [Zac Durant](https://unsplash.com/@zacdurant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/_6HzPU9Hyfg)

</ImgZoom>

||誰說一定要參加甚麼管它付費還是免費的課程才能學寫程式? 才能當軟體工程師呢? 我們的熱情不是靠來自他人意義不名的審核來下定論的。||

只有我們自己，才是對我們自己來說 最好 最棒 的導師。

讓我們繼續一起學習下去吧。

## 完結
