---
title: 01. Elixir 安裝筆記 (Windows, Ubuntu, macOS)
description: 讓我們一起學 Elixir 系列。 01. 安裝筆記。 建議使用 Linux 來安裝。本篇文章主要紀錄在 Windows 與 Ubuntu 上安裝 Elixir 的流程，包含使用 asdf 版本管理器來安裝。
summary: Elixir 安裝流程，包含使用 asdf 版本管理器來安裝 Elixir
published: 2022-05-11 GMT08:00
updated: 2022-05-11 GMT08:00
cover: ./cover.avif
series_tag: 'Learn-Elixir'
series_title: ⚡ 讓我們一起學 Elixir 🧪
tags:
  - Ubuntu
  - macOS
  - Windows
  - Elixir
---

## Windows 安裝 Elixir

建議使用 Linux 來當開發環境。Windows 用戶可以用 WSL 在 Windows 上安裝 Linux，建議參考 "[Windows 10 上安裝 WSL + Ubuntu](/dev-env/wsl/ubuntu)"，接續參考下面的 Ubuntu 安裝流程。

不然的話，直接使用 [choco](https://community.chocolatey.org/packages/Elixir) 安裝即可。後續就可以直接略過了。

```shell
sudo choco install elixir -y
```

## Ubunut & macOS 安裝 asdf

asdf 是一個軟體版本管理工具，可以讓你安裝不同版本的套件並隨時切換。

更多介紹請參考 "[官網文件](https://asdf-vm.com/guide/introduction.html)"。

### Ubuntu

安裝前置需求

```shell
sudo apt-get install curl git -y
```

安裝 asdf

```shell
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
```

#### ZSH & Git

若還沒有安裝 zsh ，可以參考 "[美化 Ubuntu Terminal - Zsh + Oh My Zsh + 一些好用的插件](/dev-env/ubuntu/oh-my-zsh)"。

打開 zsh 設定檔

```shell
vi ~/.zshrc
```

`~/.zshrc` 新增 asdf 插件到 plugins

```shell title="~/.zshrc"
plugins=(asdf ...)
```

`~/.zshrc` 文件最底新增 asdf 自動完成 (auto-completion)

```shell
/// title: ~/.zshrc
# append completions to fpath
fpath=(${ASDF_DIR}/completions $fpath)
# initialise completions with ZSH's compinit
autoload -Uz compinit && compinit
```

更多資訊，請參考 "[官方安裝流程 #ZSH & Git](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf)"。

### macOS

安裝 asdf

```shell
brew install asdf
```

#### ZSH & Homebrew

若還沒有安裝 zsh ，可以參考 "[美化 macOS iTerm2 - Oh My Zsh + 一些好用的插件](/dev-env/macos/oh-my-zsh)"。

打開 zsh 設定檔

```shell
vi ~/.zshrc
```

`~/.zshrc` 新增 asdf 插件到 plugins

```shell
/// title: ~/.zshrc
plugins=(asdf ...)
```

更多資訊，請參考 "[官方安裝流程 #ZSH & Homebrew](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf)"。

## 使用 asdf 安裝 Elixir

安裝需求套件 unzip

```shell
sudo apt-get install unzip -y
```

新增 Elixir 插件

```shell
asdf plugin add elixir
```

安裝 Elixir 最新版

```shell
asdf install elixir latest
```

設定全域使用的 Elixir 版本

```shell
asdf global elixir latest
```

有任何 asdf-elixir 插件的問題，請查看 [asdf-elixir 來源庫](https://github.com/asdf-vm/asdf-elixir)。

### 更多 asdf 指令

安裝 Elixir 特定版本

```shell
asdf install elixir 1.13.4
```

設定本地區域使用的 Elixir 版本
(必須是有安裝過的版本)

```shell
asdf local elixir 1.13.4
```

顯示目前已安裝的 Elixir 版本

```shell
asdf list elixir
```

顯示所有可安裝的 Elixir 版本

```shell
asdf list all elixir
```

顯示目前設定所有套件使用的版本

```shell
asdf curren
```

查看更多指令

```shell
asdf help
```

## (建議) 使用 asdf 安裝 Erlang

安裝所有前置套件 (適用於 Ubuntu 20.04 LTS 以上)

```shell
sudo apt-get install build-essential autoconf m4 libncurses5-dev libwxgtk3.0-gtk3-dev libwxgtk-webview3.0-gtk3-dev libgl1-mesa-dev libglu1-mesa-dev libpng-dev libssh-dev unixodbc-dev xsltproc fop libxml2-utils libncurses-dev openjdk-11-jdk -y
```

新增 Erlang 插件

```shell
asdf plugin add erlang
```

安裝 Erlang 最新版

```shell
asdf install erlang latest
```

設定全域使用的 Erlang 版本

```shell
asdf global erlang latest
```

有任何 asdf-erlang 插件的問題，請查看 [asdf-erlang 來源庫](https://github.com/asdf-vm/asdf-erlang)。

## 安裝後的測試

### Erlang Shell 查看版本

```shell
erl
```

結果類似於

```shell
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Eshell V13.0  (abort with ^G)
1>
```

### 離開 Erlang Shell

第一種方法： <kbd>Ctrl + C</kbd> 兩次

第二種方法： <kbd>Ctrl + G</kbd> 輸入 <kbd>q</kbd>

### 查看 Elixir 版本

```shell
elixir -v
```

結果類似於

```shell
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Elixir 1.13.4 (compiled with Erlang/OTP 25)
```

### 進入 Elixir Shell

進入互動式終端機 (iex)

```shell
iex
```

結果類似於

```shell
Erlang/OTP 25 [erts-13.0] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]

Interactive Elixir (1.13.4) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```

離開方式如同 Erlang Shell。

## 完結
