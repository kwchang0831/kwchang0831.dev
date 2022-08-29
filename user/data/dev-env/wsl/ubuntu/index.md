---
title: Windows 10 上安裝 WSL + Ubuntu
description: 本篇文章紀錄如何在 Windows 10 安裝 Linux 子系統 (WSL) 與 Ubuntu
summary: WSL 與 Ubuntu 的安裝流程
published: 2021-09-09 GMT08:00
updated: 2021-09-09 GMT08:00
cover: ./cover.avif
coverStyle: NONE
tags:
  - 開發環境
  - Windows
  - WSL
---


## 開頭

本篇文章紀錄如何在 Windows 10 安裝 Linux 子系統 (WSL) 與 Ubuntu。

## 環境配置

Windows 10 的版本最低至少要 2004
![fig01](./fig01.avif)

## (推薦) 安裝 Windows Terminal

Windows Terminal 的介紹與安裝，請參考 [Windows Terminal - 比 Cmder 更好用的終端機](/dev-env/windows-terminal)

## 安裝 WSL

以系統管理員身分打開 PowerShell 輸入

```shell
wsl --install
```

過程中會安裝 **虛擬機器平台**、**Windows 子系統 Linux 版**、與 **WSL Kernel**，而 OS 預設會下載 Ubuntu。

![fig02](./fig02.avif)

安裝完成需要重開機。

重開機後系統會自動啟動 **虛擬機器平台** 與 **Windows 子系統 Linux 版** 的功能，

![fig03](./fig03.avif)

若 **虛擬機器平台** 與 **Windows 子系統 Linux 版** 功能沒有啟動，

以系統管理員身分打開 PowerShell 輸入：

1.打開虛擬機器平台

```shell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

2.打開 Windows 子系統 Linux 版

```shell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

### Error 0x80370102

若是遇到錯誤訊息 `0x80370102` ，檢查一下 BIOS 裡的硬體虛擬化 (Hardware Vitrualization) 功能是否有開啟。

硬體虛擬化的名稱可能 Intel Virtualization Technology、AMD-V、Hyper-V、VT-X、Vanderpool 或是 SVM。

![fig04](./fig04.avif)

## 更新 WSL 的 Kernal

### 方式 1. 指令更新

以系統管理員身分打開 PowerShell 輸入

```shell
wsl --update
```

若無法更新的話，記得先打開 `Windows Update 設定` > `進階選項`，  
打開第一個選項: `當您更新Windows時，收到其他Microsoft產品的更新`

![fig05](./fig05.avif)

### 方式 2. 手動下載更新檔

從 https://aka.ms/wsl2kernel 下載 Kernel 更新檔並安裝。

## (選用) 手動安裝 Ubuntu

若前面的步驟並沒有自動安裝 Ubuntu，也可以選擇自行安裝，

查詢可安裝的 Linux Distro

```shell
wsl -l -o
```

選擇安裝 Ubuntu

```shell
wsl --install -d Ubuntu
```

## Ubuntu 初始設置

安裝完成後，Ubuntu 會要求你新建用戶名稱與密碼。

![fig06](./fig06.avif)

## 確認安裝

在 PowerShell 裡輸入以下指令，這時可以看到有一個 Ubuntu 正在執行中。

```shell
wsl --list --verbose
```

## 更新 Ubuntu

```shell
sudo apt update -y && sudo apt upgrade -y
```

## (選用) 安裝 NeoFetch

NeoFetch 是一個顯示電腦配置的小工具。

在 Ubuntu 裡輸入以下指令進行安裝：

```shell
sudo apt install neofetch -y
```

執行 neofetch

```shell
neofetch
```

## 參考資料

- https://docs.microsoft.com/zh-tw/windows/wsl/install-win10

## 完結
