---
title: PhotoPrism - 自己架設 Google 相簿
description: 本篇文章紀錄如何從頭到尾架設 PhotoPrism - 類似 Google 相簿 的開源照片管理伺服器。 主要的功能包含AI圖片自動分類功能；可偵測顏色、物體、人臉等等資訊，讓使用者可以更快速找到照片。 支援顯示照片與影片也支援顯示相機 Exif 的資訊。 也包含了用世界地圖的方式來整理照片。
summary: 安裝架設開源照片管理伺服器，類似 Google 相簿，包含 AI 圖片自動分類等功能
published: '2021-12-07T00:00:00.000+08:00'
updated: '2021-12-07T00:00:00.000+08:00'
cover: ./cover.webp
coverStyle: NONE
tags:
  - Ubuntu
---

## 開頭

本篇文章紀錄如何從頭到尾架設 PhotoPrism - 類似 Google 相簿的開源照片管理伺服器。

主要的功能包含有機器學習的圖片自動分類功能： 可偵測顏色、物體、人臉等等資訊。 讓使用者可以更快速找到照片。支援顯示照片與影片也支援顯示相機 Exif 的資訊，也包含了用世界地圖的方式來整理照片。

架設 PhotoPrism，最少只需一台主機即可。

根據[系統需求](https://docs.photoprism.org/getting-started/#system-requirements)，這台主機需求至少 2 核心 與 4GB RAM。硬碟空間則是除了安裝 OS 與 包含至少 4GB 的 Swap 交換空間，就是依照個人照片檔案庫大小而定了。

根據[擴展性](https://docs.photoprism.org/getting-started/advanced/scalability/)，目前開發團隊主要測試環境是偏向小型伺服器主機與家用用途，檔案數量不超過 50 萬。若是有其他需求請查看[官網](https://docs.photoprism.org/)或聯繫該開發團隊。

## DEMO 試看看

進入官方的 DEMO 網站測試看看： [https://demo.photoprism.org/browse](https://demo.photoprism.org/browse)

我們可以先從設定把操作介面的語言改成繁體中文。

![fig01](./fig01.webp)

我們可以搜尋 `dog` (狗) 試試看。 目前標籤與關鍵字搜尋只支援英文。

![fig02](./fig02.webp)

或是到 [https://demo.photoprism.app/labels](https://demo.photoprism.app/labels)，這邊我們可以看到所有已經辨識出來的標籤。

![fig03](./fig03.webp)

剩下的功能就讓各位自己去嘗試了，我們接下來介紹安裝流程。

## 安裝環境與流程

架設 PhotoPrism 最少需要一台主機，概略流程為：

- 使用一台主機 安裝 Ubuntu Server
- 安裝完 Ubuntu Server 後設置 Samba 分享資料夾，讓內網內的其他電腦或手機可以上傳照片與影片到這台 Ubuntu Server。
- Ubuntu Server 安裝 Docker、Docker Compose
- Ubuntu Server 安裝 PhotoPrism

不過以下我們會示範進階一點的架設。概略流程為：

- 使用一台 安裝好 [TrueNAS](https://www.truenas.com/) 的主機
- 照片影片皆儲存於 [TrueNAS](https://www.truenas.com/) 主機上的資料夾內，並使用 Samba 進行內網內的資料夾共享
- 使用 TrueNAS 建立 一個 Virtual Machine (VM) 虛擬電腦的 instance 來安裝 Ubuntu Server，之後用來架設 PhotoPrism
- 安裝完 Ubuntu Server 之後，設置開機自動掛載 [TrueNAS](https://www.truenas.com/) 上的 Samba 共享資料夾
- Ubuntu Server 安裝 Docker、Docker Compose
- Ubuntu Server 安裝 PhotoPrism

主要的差別是把實際存放照片影片檔案的部分與 PhotoPrism 的主機分開來，但安裝流程的邏輯大致上還是差不多的。

這樣的好處是即使 PhotoPrism 的主機掛了，我們的照片影片檔案皆不會受到影響，而且 [TrueNAS](https://www.truenas.com/) 本身使用 [ZFS 檔案系統](https://zh.wikipedia.org/zh-tw/ZFS) 有很多保護措施來防止資料損壞，且可以依照我們 RAID-Z 的配置來選擇要承受硬碟壞掉的風險。舉例來說 RAID-Z2 組合需要最少 4 顆硬碟，可以容忍同時間最多 2 顆硬碟壞掉還可以繼續運轉。

本篇文章不會再多著墨於 TrueNAS 與 ZFS 上，若有需求我們可以再另外寫一篇文章介紹如何安裝 [TrueNAS](https://www.truenas.com/)。

## 示範環境架構圖

由一台無線路由器從中華電信的小烏龜連到網際網路，並獨立出 192.168.0.0/24 的網段。該網段裡包含一台桌上型電腦、一台 [TrueNAS](https://www.truenas.com/) 伺服器主機、與一部智慧型手機。

[TrueNAS](https://www.truenas.com/) 伺服器主機設置了 Samba 內網用共享資料夾 與 一個 Virtual Machine (VM) 虛擬電腦 instance 準備用來架設 PhotoPrism。而該台 [TrueNAS](https://www.truenas.com/) 伺服器主機使用了 ZFS 檔案系統，並使用 RAID-Z2 的硬碟陣列模式來提高資料的安全性。

桌上型電腦、智慧型手機、與 VM 都可以透過內網存取 [TrueNAS](https://www.truenas.com/) 伺服器主機上的 Samba 內網用共享資料夾，新增與刪除檔案。PhotoPrism 的主機只會讀取 Samba 內網用共享資料夾裡的檔案，並不會變更或修改檔案。PhotoPrism 主要是在讀取照片與影片檔案之後，去進行分析整理後生成根據這些資料的資料。

![fig04](./fig04.webp)

## (選用) 新增 Linux VM 在 TrueNAS

若只是要用單主機安裝 PhotoPrism，可以直接跳過此步驟。

打開 TrueNAS 的 WebAdmin (`http://192.168.0.2`)。進入 Virtual Machines 選單並 Add 新增新的 Instance 。

新增一個 有一顆 4 核心雙線程 CPU 與 512GB 硬碟空間 的 VM。

以下為參考流程：

![fig05](./fig05.webp)
![fig06](./fig06.webp)
![fig07](./fig07.webp)
![fig08](./fig08.webp)
![fig09](./fig09.webp)
![fig10](./fig10.webp)

之後點擊新增好的 VM，然後點擊 VNC 連線進去操作安裝過程。

## 安裝 Ubuntu Server

下載 Ubuntu Server 20.04.3 LTS：[https://ubuntu.com/download/server](https://ubuntu.com/download/server)

進入 Ubuntu 安裝畫面。

![fig11](./fig11.webp)

都是選 English (US) 就可以了。

![fig12](./fig12.webp)

網路設定，預設是使用 DHCP 自動取得 IP。

![fig13](./fig13.webp)

我們這邊會示範自訂 IP。 上下選到網路介面然後選擇 Edit IPv4。

![fig14](./fig14.webp)

IPv4 Method 改成 Manual 手動，然後這邊 Subnet 的寫法不是用 Subnet Mask (255.255.255.0)方式來寫。根據稍早的示範環境架構圖，我們的無線路由器在 192.168.0.1，整個網段為 192.168.0.0/24。

![fig15](./fig15.webp)

Proxy 與 Mirror 的部分都不用更動。

![fig16](./fig16.webp)

![fig17](./fig17.webp)

設置存儲空間。

![fig18](./fig18.webp)

存儲空間這邊建議直接按下 Reset 之後，再自行修改。

![fig19](./fig19.webp)

![fig20](./fig20.webp)

選擇物理硬碟後，新增 GPT Partition。

我們只需要新增 Mount: / 的空間即可，安裝精靈會幫我們增加開機要用的 Partition ( /bott/efi )。我是直接輸入超過 max size 的容量，安裝精靈會幫我們修正成可容許的最大空間。

![fig21](./fig21.webp)

![fig22](./fig22.webp)

按下 Done 就完成設置存儲空間。

![fig23](./fig23.webp)

再次確認，選擇繼續 Continue。

![fig24](./fig24.webp)

建立使用者檔案。

![fig25](./fig25.webp)

這邊要選擇安裝 OpenSSH Server，這樣我們之後才可以從遠端電腦用 SSH 連線進來。

![fig26](./fig26.webp)

這邊 Snaps 建議都不用安裝，直接繼續就好。有需要的套件，我們之後會一起安裝。

![fig27](./fig27.webp)

開始安裝中。

![fig28](./fig28.webp)

安裝完成。

![fig29](./fig29.webp)

關機，退出安裝用 USB 或 CD，重開機。

### (選用) TrueNAS 移除安裝光碟機

顯示安裝完成後回到 TrueNAS 網頁介面把這 VM 關機 (POWER OFF)。

![fig30](./fig30.webp)

點選 DEVICES 把 CDROM (安裝光碟) 的部分刪除。這樣我們才能正常開機而不是再次進入安裝程序。

![fig31](./fig31.webp)

把 VM 開機。

### 重新開機 Ubuntu Server

開機後，輸入我們安裝時設置的使用者帳號與密碼登入即可。

![fig32](./fig32.webp)

這樣就完成了。我們之後就可以準備開始安裝 PhotoPrism。

![fig33](./fig33.webp)

### (選用) SSH remote 進入 Ubuntu Server

使用 SSH 從其他電腦進入我們剛剛安裝好的主機 (請換成我們自己的帳號)

`ssh {使用者ID}@{主機IP位址}`

```shell
ssh kwchang0831@192.168.0.3
```

![fig34](./fig34.webp)

![fig35](./fig35.webp)

### (選用) 架設 Samba 分享資料夾

如果檔案會儲存在本機上，並透過內網的方式分享給其他電腦設備的話，我們需要設定架設 Samba 分享資料夾。

若不是檔案會儲存在本機上，請跳過此步驟，直接往下個步驟：掛載 Samba 分享資料夾。

安裝所需套件

```shell
sudo apt update -y && sudo apt install samba
```

檢查安裝

```shell
whereis samba
```

建立分享資料夾
(自行修改 username 與 sambashare 的資料夾名稱)

```shell
mkdir /home/<username>/<sambashare>/
```

修改 Samba 設定檔

```shell
sudo nano /etc/samba/smb.conf
```

新增以下內容至 Samba 設定檔
(自行修改 sambashare 資料夾名稱 與 path 路徑)

```shell
[sambashare]
    comment = Samba on Ubuntu
    path = /home/username/sambashare
    read only = no
    browsable = yes
```

使用 <kbd>Ctrl + O</kbd> 存檔 ； <kbd>Ctrl + X</kbd> 離開。

新增 Samba 使用者帳號，並依造指示設定
(自行選擇 username 使用者名稱)

```shell
sudo smbpasswd -a username
```

重新啟動 Samba

```shell
sudo service smbd restart
```

如果有開過防火牆，記得打開

```shell
sudo ufw allow samba
```

設定都完成之後就可以透過
`\\Ubuntu Server 的 IP\sambashare`
來進入分享資料夾內了。

### (選用) 掛載 Samba 分享資料夾

如果檔案不會儲存在本機上，會使用在網路分享資料夾上的檔案的話，
我們需要設定連接 Samba 分享資料夾，並啟動開機自動掛載。

安裝所需套件

```shell
sudo apt install cifs-utils
```

設定開機自動掛載

```shell
sudo nano /etc/fstab
```

在文件最下面新增一行 (請換成我們自己的路徑)

`//server/share/ /mnt/localmountpoint cifs credentials=/home/user/.cifs 0 0`

`要掛載的遠端資料夾 掛載的位置 cifs 帳號密碼檔案 0 0`

```shell
//192.168.0.2/photo  /home/kwchang0831/photo  cifs  credentials=/home/kwchang0831/.cifs 0 0
```

新增一個`.cifs`檔案並放入 Samba 資料夾登入帳密

```shell
nano ~/.cifs
```

更改 `~/.cifs` 的內容 (請換成自己的帳號密碼)

```shell
username=kwchang0831
password=kwchang0831
```

掛載的位置的資料夾要新增

```shell
mkdir ~/photo
```

應用掛載資料夾

```shell
sudo mount -a
```

### (選用) 掛載資料夾的權限問題

應先確認 Samba 共享資料夾伺服器上的設定。

若沒問題，可以嘗試看看修改 `/etc/fstab`

```shell
sudo nano /etc/fstab
```

把之前的設定改成全開放看看 (請換成自己的路徑)

```shell
//192.168.0.2/photo  /home/kwchang0831/photo  cifs  credentials=/home/kwchang0831/.cifs,_netdev,x-systemd.automount,file_mode=0777,dir_mode=0777 0 0
```

### (選用) 若重開機不會自動掛載

設置開機啟動腳本

```shell
nano /etc/rc.local
```

新增以下內容 (請換成自己的路徑)

```shell
mount /home/kwchang0831/photo
exit 0
```

### (選用) Windows 上存取 Samba 分享資料夾

打開檔案總管，輸入 `\\{Samba 伺服器的 IP}\{分享資料夾的名字}`。

依我們示範環境為 `\\192.168.0.2\photo`。之後輸入設定的帳號密碼即可。

## 準備安裝 PhotoPrism

### 設定時區

主機預設時區 UTC+0:00 可以輸入以下來更改為台北時區

```shell
sudo timedatectl set-timezone Asia/Taipei
```

安裝 PhotoPrism 會用 Docker 虛擬容器的方式來安裝與運行。

### 安裝 Docker

刪除之前安裝的 Docker，之前若沒安裝過也還是可以跑一下確認沒關係。

```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

更新 Ubuntu

```shell
sudo apt update -y && sudo apt upgrade -y
```

安裝所需的套件

```shell
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
```

新增 GPG 金鑰

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

設置 Repo

```shell
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

安裝 Docker

```shell
sudo apt update -y && sudo apt-get install docker-ce docker-ce-cli containerd.io -y
```

查看 Docker 版本 確認安裝

```shell
docker -v
```

### 安裝 Docker Compose

下載 2.4.1 版本 Docker Compose (若有更新版本可自行修改下方的網址)

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/v2.4.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

這裡可以查看 Docker Compose 最新版本: [https://github.com/docker/compose/releases/](https://github.com/docker/compose/releases/)

給予執行權限

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

連結

```shell
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

查看版本 確認安裝

```shell
docker-compose --version
```

### 安裝 PhotoPrism

安裝所需套件

```shell
sudo apt install wget -y
```

創建一個資料夾並進入

```shell
mkdir ~/photoprism && cd ~/photoprism
```

下載 設定檔

```shell
wget https://dl.photoprism.org/docker/docker-compose.yml
```

### 修改設定檔案

比較重要的幾個地方為以下：

Uncomment 下面反白的那行 打開自動重啟

```yaml
/// showLineNumber
/// hlLines: 11
services:
  ## App Server (required)
  photoprism:
    ## Use photoprism/photoprism:preview for testing preview builds:
    image: photoprism/photoprism:latest
    depends_on:
      - mariadb
    ## Only enable automatic restarts once your installation is properly
    ## configured as it otherwise may get stuck in a restart loop,
    ## see https://docs.photoprism.org/getting-started/faq/#why-is-photoprism-getting-stuck-in-a-restart-loop
    restart: unless-stopped
    security_opt:
      - seccomp:unconfined
      - apparmor:unconfined
```

改成 Port 80 的話，登入網址就不需要再輸入任何 Port 了。
我們可以直接從網址 192.168.0.3 登入，而不是 192.168.0.3:2342。

```yaml
/// showLineNumber
/// hlLines: 5
...
   ## Run as a specific, non-root user (see https://docs.docker.com/engine/reference/run/#user):
    # user: "1000:1000"
    ports:
      - "80":2342" # HTTP port (host:container)
...
```

修改或是記好登入用的初始密碼 (之後登入之後可以再修改)。

```yaml
/// showLineNumber
/// hlLines: 3
---
environment:
  PHOTOPRISM_ADMIN_PASSWORD: 'insecure' # PLEASE CHANGE: Your initial admin password (min 4 characters)
  PHOTOPRISM_SITE_URL: 'http://localhost:2342/' # Public server URL incl http:// or https:// and /path, :port is o>      PHOTOPRISM_ORIGINALS_LIMIT: 5000               # File size limit for originals in MB (increase for high-res video)      PHOTOPRISM_HTTP_COMPRESSION: "gzip"            # Improves transfer speed and bandwidth utilization (none or gzip)
  PHOTOPRISM_DEBUG: 'false' # Run in debug mode (shows additional log messages)
```

於反白處，修改放照片原始檔案的位置，這邊我是用稍早前設定好的 Samba 分享資料夾。

```yaml
/// showLineNumber
/// hlLines: 4
---
volumes:
  ## The *originals* folder contains your original photo and video files (- "[host folder]:/photoprism/originals"):
  - '/home/kwchang0831/photo:/photoprism/originals'
  ## Multiple folders can be made accessible by mounting them as subfolders of /photoprism/originals:
  # - "/mnt/Family:/photoprism/originals/Family"    # [folder 1]:/photoprism/originals/[folder 1]
  # - "/mnt/Friends:/photoprism/originals/Friends"  # [folder 2]:/photoprism/originals/[folder 2]
  ## You may mount an *import* folder from which files can be transferred to *originals* (optional):
  # - "~/Import:/photoprism/import"
  ## Cache, session, thumbnail, and sidecar files will be created in the *storage* folder (never remove):
  - './storage:/photoprism/storage'
```

Uncomment 反白處，打開自動升級。

```yaml
/// showLineNumber
/// hlLines: 5-12
---
## Watchtower upgrades services automatically (optional)
## see https://docs.photoprism.org/getting-started/updates/#watchtower

watchtower:
  restart: unless-stopped
  image: containrrr/watchtower
  environment:
    WATCHTOWER_CLEANUP: 'true'
    WATCHTOWER_POLL_INTERVAL: 7200 # Checks for updates every two hours
  volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'
#     - "~/.docker/config.json:/config.json" # Optional, for authentication if you have a Docker Hub account
```

都改好設定檔之後，就可以啟動 PhotoPrism
以啟動 PhotoPrism。

### 啟動 PhotoPrism

```shell
sudo docker-compose up -d
```

啟動之後要稍微等一下，等環境都設置好。

打開瀏覽器，在網址列輸入伺服器的 IP，進入 PhotoPrism 網頁介面。

帳號: admin，密碼是剛剛設定檔裡的那個密碼。

登入之後，可以到 Settings > ACCOUNT 修改密碼。修改後的密碼記得不要忘記了。

### 建立 .ppignore 忽略檔案

到 `~/photo` 共享資料夾裡，新增一個 `.ppignore` 的檔案。

```shell
cd ~/photo
touch .ppignore
```

這個檔案可以讓你自訂哪些檔名或資料夾不要被掃描進去 PhotoPrism 的相本裡。

每個子資料夾也都可以有自訂的 `.ppignore` 檔案。

詳細請參考: [https://docs.photoprism.org/user-guide/library/originals/#ignoring-files-and-folders](https://docs.photoprism.org/user-guide/library/originals/#ignoring-files-and-folders)

### 掃描檔案

在 `~/photoprism` 裡執行

```shell
docker-compose exec photoprism photoprism index
```

照片很多的話，建立 index 需要時間。

如果是用 SSH 登入的話，掃描沒有結束記得不要關閉，不然就會被中斷。如果想要關閉 SSH 然後不中斷處理程序的話，建議使用 [tmux](https://github.com/tmux/tmux)。

掃描完畢之後就完成了。你的照片與影片都可以瀏覽了。

### 其他常用指令

在 `~/photoprism` 裡執行

停止 PhotoPrism

```shell
sudo docker-compose stop photoprism
```

啟動 PhotoPrism

```shell
sudo docker-compose up -d photoprism
```

全部重新掃瞄檔案 (包含已掃描過)

```shell
sudo docker-compose exec photoprism photoprism index -f
```

編碼影片

```shell
sudo docker-compose exec photoprism photoprism convert
```

更多指令請參考: [https://docs.photoprism.org/getting-started/docker-compose/#examples](https://docs.photoprism.org/getting-started/docker-compose/#examples)

## Google 相簿下載與遷移

透過 Google 匯出，我們可以把儲存在 Google 相簿中的相片與影片全部都下載下來，放入我們的 PhotoPrism 中。

官方教學請查看: [https://support.google.com/accounts/answer/9666875?hl=zh-Hant](https://support.google.com/accounts/answer/9666875?hl=zh-Hant) 。

或是到 [https://myaccount.google.com/dashboard](https://myaccount.google.com/dashboard[) 點選`下載您的資料` 。

![fig36](./fig36.webp)

只選擇 Google 相簿後，點選下一步

![fig37](./fig37.webp)

然後依造自己喜好的設定，建立匯出作業。

![fig38](./fig38.webp)

等匯出作業完成之後，把所有分割的壓縮檔案都下載並解壓縮到 PhotoPrism 的資料夾中，之後重新跑掃描檔案就可以了。

## 最後

辛苦了，希望各位已經成功架設了自己 Google 相簿。

若哪裏有問題，還望不吝指教。

## 參考資料

- [https://docs.docker.com/engine/install-guide/ubuntu/](https://docs.docker.com/engine/install-guide/ubuntu/)
- [https://docs.photoprism.org/](https://docs.photoprism.org/)
- [https://docs.photoprism.org/getting-started/docker-compose/](https://docs.photoprism.org/getting-started/docker-compose/)

## 完結
