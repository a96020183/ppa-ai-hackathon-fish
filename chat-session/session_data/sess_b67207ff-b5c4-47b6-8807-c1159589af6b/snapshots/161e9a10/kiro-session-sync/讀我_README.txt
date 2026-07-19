Kiro 對話 Session 搬移包
=========================

目的：把這台 PC 的 Kiro 對話（PPA AI Hackathon / 團隊 fish）搬到「另一台你的 PC」，
      並能在另一台接著跟 Kiro 對話。

內容物：
  - session_data\sess_b67207ff-...\   ← 對話本體（messages.jsonl / session.json / snapshots）
  - install_on_pc2.ps1                ← 在另一台 PC 執行的自動安裝腳本
  - 讀我_README.txt                   ← 本說明

────────────────────────────────────────
搬移步驟
────────────────────────────────────────
1. 把整個「kiro-session-sync」資料夾複製到另一台 PC
   （用 USB / 雲端硬碟 / 網路分享都行）。

2. 在另一台 PC 決定你的專案要放哪，建議直接把 GitHub repo clone 下來：
       git clone https://github.com/a96020183/ppa-ai-hackathon-fish.git
   假設它在   C:\Users\你的名字\ppa-ai-hackathon-fish
   （或你把整個 AWS 專案資料夾複製過去，路徑自己記住）

3. 在另一台 PC 開 PowerShell，切到本資料夾，執行：
       powershell -ExecutionPolicy Bypass -File .\install_on_pc2.ps1
   它會問你「專案資料夾的完整路徑」→ 輸入步驟 2 那個路徑。
   （或直接：  .\install_on_pc2.ps1 -WorkspacePath "C:\Users\你的名字\ppa-ai-hackathon-fish"）

4. 完全關閉並重開 Kiro，用它開啟同一個資料夾為工作區。
   對話「CLAUDE / PPA」就會出現在 session 列表，可以接著聊。

────────────────────────────────────────
原理（給好奇的你）
────────────────────────────────────────
Kiro 把每個對話存在：
   %USERPROFILE%\.kiro\sessions\<工作區雜湊>\<sess_id>\
其中「工作區雜湊」= SHA256(工作區路徑小寫、正斜線) 的前 16 個十六進位字元。
腳本會用你在這台 PC 的專案路徑，重新算出正確的雜湊資料夾名，
把 session 放進去，並修正 session.json 內的 workspacePaths。

注意：
- 這是根據目前觀察到的 Kiro 儲存規則做的，不同 Kiro 版本若改了規則可能失效。
- 若兩台是同一個 Windows 使用者名稱、專案放同一路徑，其實直接整包複製到
  %USERPROFILE%\.kiro\sessions\ 也會認得。
- 若對話沒出現，先確認：路徑是否一致、Kiro 是否用同一帳號登入、是否已重開 Kiro。
