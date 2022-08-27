---
title: PowerShell 7 - 來安裝最新版的 pwsh
description: 本篇文章主要紀錄最新版本 PowerShell 的安裝流程。 環境配置為 Windows 10 搭配 Windows Terminal 。  PowerShell 是一個跨平台 (Windows, Linux, 與 macOS) 的 自動化工具 / 框架 與 Shell。
summary: PowerShell 7 基本安裝
published: 2021-09-06 GMT08:00
updated: 2021-09-06 GMT08:00
cover: ./cover.avif
coverStyle: NONE
tags:
  - Year: 2021
  - Language: 中文
  - 開發環境
  - Windows
  - Windows Terminal
  - pwsh
---

## 開頭

PowerShell 是一個跨平台 (Windows, Linux, 與 macOS) 的 自動化工具 / 框架 與 Shell。

本篇文章紀錄 PowerShell 7 - 最新版 pwsh 的基本安裝。

## 環境配置

- Windows 10
- Windows Termianl

## (建議) 安裝 Windows Terminal

若還沒有安裝 Windows Terminal ，請參考 [Windows Terminal - 比 Cmder 更好用的終端機](/dev-env/windows-terminal)

## 安裝 1. 手動安裝

### 從 Github Repo 下載

https://aka.ms/powershell-release?tag=stable

選擇 `PowerShell-7.x.x-win-x64.msi` 下載，或根據你的作業系統環境選擇對應的安裝檔案。

之後按造安裝精靈的指示完成安裝，  
除了添加下面兩個增加右鍵選單的選項，其餘都是 `Next` 下一步就可以了。

![fig01](./fig01.avif)

### 完成安裝

安裝完 PowerShell 後，  
重新打開 Windows Terminal 就可以看到 PowerShell 已經被自動加入清單。

![fig02](./fig02.avif)

## 安裝 2. 使用 chocolatey 安裝

使用 [chocolatey](https://chocolatey.org/install) 可以更快地安裝 PowerShell 7 。

以系統管理員身分打開 `cmd` 後輸入，

```shell
choco install -y powershell-core
```

## 完結
