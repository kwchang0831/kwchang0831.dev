---
title: Centos 7 安裝 Zsh + Oh My Zsh + Powerlevel10k 與好用插件
description: 本篇文章紀錄如何美化 Centos Terminal ，並安裝一些插件讓開發環境更高效。 包含安裝 Zsh 、 Oh My Zsh 與 Powerlevel10k 主題。
summary: Zsh, Oh My Zsh, Powerlevel 10k 與 一些好用插件的安裝流程
published: 2021-09-12 GMT08:00
updated: 2021-09-12 GMT08:00
cover: ./cover.avif
coverStyle: NONE
tags:
  - 開發環境
  - Centos
---

## 開頭

本篇文章紀錄如何美化 Centos 的 Terminal ，讓平常工作起來更高效。

因目前 Centos 7 上用 yum 能安裝到 Zsh 版本只到 5.02，  
而 Powerlevel10k 對於 Zsh 版本需求為 5.1 以上，  
本篇文章會介紹如何從 GitHub 下載 Zsh 的原始碼進行編譯安裝。

本篇文章會安裝以下套件：

- Zsh
- Oh My Zsh
- Powerlevel 10k 主題
- zsh-autosuggestions
- zsh-syntax-highlighting
- Zsh-z

## 環境配置

以下使用的環境配置為 Windows 10 搭配 WSL 的 Centos 7 ， 並使用 Windows Terminal 來進行操作。直接使用 Centos 的話，安裝流程也是大致相同可供參考。

## 安裝 Patched 字型

我們必須先安裝 Patched 過的字型，之後才能正確地顯示字型與圖示。

下載並安裝以下四個字型：

- [MesloLGS NF Regular.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf)
- [MesloLGS NF Bold.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf)
- [MesloLGS NF Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf)
- [MesloLGS NF Bold Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf)

```shell
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf &&
wget https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf
```

下載完成後在檔案點擊右鍵並選擇 **安裝** 或 **為所有使用者安裝**。

## 更改字體

到 Windows Terminal 的設定 > Ubuntu 設定檔 > 外觀， 更改字體為 **MesloLGS NF**。

## 安裝 DNF

```shell
yum install dnf -y
```

## 更新 Centos

```shell
dnf update -y && dnf upgrade -y
```

## 移除舊版 Zsh

```shell
dnf remove zsh
```

## 安裝最新版 Zsh

1.安裝必要套件

```shell
dnf install curl git make ncurses-devel gcc autoconf man -y
```

2.下載 最新版 Zsh

```shell
git clone -b zsh-5.8.1 https://github.com/zsh-users/zsh.git /tmp/zsh
```

文章截稿時的最新版是 5.8.1。

若有其他版本的需求，請參考 https://github.com/zsh-users/zsh/releases 。  
並更改對應 branch 的版本下載。

3.編譯安裝 Zsh

```shell
cd /tmp/zsh
./Util/preconfig
./configure
make -j 20 install.bin install.modules install.fns
```

4.刪除剛下載的 Zsh Repo

```shell
rm -rf /tmp/zsh
```

5.新增 Zsh

```shell
command -v zsh | sudo tee -a /etc/shells
```

6.更改預設 Shell 為 Zsh

```shell
sudo chsh -s $(which zsh)
```

## 安裝 [Oh My Zsh](https://ohmyz.sh/)

輸入以下指令安裝 Oh My Zsh，安裝完畢後，按下 Enter 同意把預設 Shell 換成 Zsh。

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## (選用) 設定預設 Shell

若之前並沒有成功設定修改預設 Shell，請執行以下指令:

```shell
chsh -s $(which zsh)
```

執行 zsh 開始使用

```shell
zsh
```

## 安裝插件

安裝以下插件的時候，  
請確定已安裝好 Oh My Zsh ，且目前正在使用的 Shell 是 Zsh。

### 主題 [PowerLevel10k](https://github.com/romkatv/powerlevel10k)

```shell
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

### 插件 [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

輸入指令時，如果看到灰色字的自動完成顯示，可以按下<kbd>➔</kbd>來採用。

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 插件 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### (選用) 插件 [Zsh-z](https://github.com/agkozak/zsh-z)

類似於 [autojump](https://github.com/wting/autojump) 的插件，比 `cd` 更快速地直接跳到想去的資料夾，且效能更好沒有一堆依賴包。

```shell
git clone https://github.com/agkozak/zsh-z $ZSH_CUSTOM/plugins/zsh-z
```

#### 使用方法

查看已知的資料夾位置

```shell
z
```

進入在子資料夾中包含此字串的資料夾，可以用 <kbd>Tab</kbd> 來選擇結果，如果有多個符合 et 的資料的話。

```shell
cd /
z et
```

查看其他用法

```shell
z -h
```

## 啟動插件

```shell
vi ~/.zshrc
```

點擊 <kbd>i</kbd>，進入編輯模式。

1.修改主題

`ZSH_THEME="powerlevel10k/powerlevel10k"`

2.新增要啟動的插件 (Plugins)

`plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-z)`

點擊 <kbd>ESC</kbd> 跳出編輯模式。

輸入 `:wq` 儲存。

3.應用修改過的 zshrc

```shell
source ~/.zshrc
```

應用修改之後，因為第一次使用 Powerlevel10k，會自動啟動設定，按造需求完成設定即可。

4.重新設定 Powerlevel10k

若之前沒有啟動 Powerlevel10k 設定小幫手，或是日後需要重新設定 Powerlevel10k，

打開 Shell 輸入，

```shell
p10k configure
```

## 參考資料

- https://ohmyz.sh/
- https://github.com/romkatv/powerlevel10k

## 完結
