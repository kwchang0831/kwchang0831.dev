---
title: Ubuntu 安裝 Zsh + Oh My Zsh + Powerlevel10k 與各種插件
description: 本篇文章紀錄如何美化 Ubuntu Terminal ，並安裝一些插件讓開發環境更高效。 包含安裝 Zsh, Oh My Zsh, Powerlevel10k 主題, zsh-autosuggestions, zsh-syntax-highlighting, Zsh-z。
summary: Zsh, Oh My Zsh, Powerlevel10k 與 一些好用插件的安裝流程
published: 2021-09-09 GMT08:00
updated: 2021-09-09 GMT08:00
cover: ./cover.avif
coverStyle: NONE
tags:
  - 開發環境
  - Ubuntu
---

## 開頭

本篇文章紀錄如何美化 Ubuntu 的 Terminal ，讓平常工作起來更高效。

本篇文章會安裝以下套件：

- [Zsh](https://www.zsh.org/)
- [Oh My Zsh](https://ohmyz.sh/)
- [Powerlevel10k 主題](https://github.com/romkatv/powerlevel10k)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
- [Zsh-z](https://github.com/agkozak/zsh-z)

## 環境配置

以下使用的環境配置為 Windows 10 搭配 WSL 的 Ubuntu ， 並使用 Windows Terminal 來進行操作。  
直接使用 Ubuntu 的話，安裝流程也是大致相同可供參考。

## 安裝 必要的套件

```shell
sudo apt install wget git curl vim -y
```

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

- Windows

下載完成後在檔案點擊右鍵並選擇 **安裝** 或 **為所有使用者安裝**。

- Ubuntu

點擊兩下字型檔案，點擊 Install 。

## 更改字體

- Windows

到 Windows Terminal 的設定 > Ubuntu 設定檔 > 外觀， 更改字體為 **MesloLGS NF**。

- Ubuntu

使用內建的 Terminal，字型安裝完畢之後，就可以直接正常顯示不需用修改任何參數。

## 安裝 Zsh

shell 輸入

```shell
sudo apt install zsh -y
```

## 安裝 Oh My Zsh

輸入以下指令安裝 Oh My Zsh，安裝完畢後，按下 Enter 同意把預設 Shell 換成 Zsh。

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 設定預設 Shell

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

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 插件 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 插件 [Zsh-z](https://github.com/agkozak/zsh-z)

類似於 [autojump](https://github.com/wting/autojump) 的插件，比 `cd` 更快速地直接跳到想去的資料夾，且效能更好沒有一堆依賴包。

```shell
git clone https://github.com/agkozak/zsh-z $ZSH_CUSTOM/plugins/zsh-z
```
<!-- https://github.com/agkozak/zsh-z/raw/master/img/demo.gif -->
![ZSH Demo](./zsh-demo.webm)

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

- https://github.com/ohmyzsh/ohmyzsh
- https://github.com/romkatv/powerlevel10k
- https://github.com/zsh-users/zsh-autosuggestions
- https://github.com/zsh-users/zsh-syntax-highlighting

## 完結
