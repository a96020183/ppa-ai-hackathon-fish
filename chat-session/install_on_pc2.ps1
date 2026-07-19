# ============================================================
#  Kiro 對話 session 搬移安裝腳本（在「另一台 PC」上執行）
#  作用：把打包的對話 session 安裝到這台 PC 的 Kiro，讓你能接著聊。
# ============================================================
param(
  [string]$WorkspacePath  # 這台 PC 上「專案資料夾」的完整路徑；不填會問你
)

$ErrorActionPreference = 'Stop'
$SESS_NAME = 'sess_b67207ff-b5c4-47b6-8807-c1159589af6b'

Write-Host "=== Kiro Session 搬移安裝 ===" -ForegroundColor Cyan

# 1) 取得目標工作區路徑
if (-not $WorkspacePath) {
  Write-Host "請問：你打算在『這台 PC』把專案(工作區)放在哪個資料夾？"
  Write-Host "例如：C:\Users\你的名字\AWS"
  $WorkspacePath = Read-Host "輸入完整路徑"
}
if (-not $WorkspacePath) { Write-Error "沒有輸入路徑，中止。"; exit 1 }

# 2) 正規化路徑並算出 Kiro 的工作區雜湊（sha256 小寫正斜線 前16碼）
$norm = ($WorkspacePath.Trim().ToLower() -replace '\\','/').TrimEnd('/')
$sha  = [System.Security.Cryptography.SHA256]::Create()
$bytes= [System.Text.Encoding]::UTF8.GetBytes($norm)
$hex  = -join ($sha.ComputeHash($bytes) | ForEach-Object { $_.ToString('x2') })
$folder = $hex.Substring(0,16)

Write-Host ""
Write-Host "正規化路徑 : $norm"
Write-Host "工作區雜湊 : $folder" -ForegroundColor Yellow

# 3) 目的地
$sessionsRoot = Join-Path $env:USERPROFILE ".kiro\sessions"
$destWs   = Join-Path $sessionsRoot $folder
$destSess = Join-Path $destWs $SESS_NAME
$srcSess  = Join-Path $PSScriptRoot ("session_data\" + $SESS_NAME)

if (-not (Test-Path $srcSess)) { Write-Error "找不到打包的 session：$srcSess"; exit 1 }

New-Item -ItemType Directory -Force -Path $destWs | Out-Null
if (Test-Path $destSess) {
  $bak = "$destSess.bak_" + (Get-Date -Format 'yyyyMMdd_HHmmss')
  Write-Host "偵測到同名 session，先備份為：$bak" -ForegroundColor DarkYellow
  Move-Item $destSess $bak
}
Copy-Item -Recurse -Force $srcSess $destWs
Write-Host "已複製 session 到：$destSess" -ForegroundColor Green

# 4) 修正 session.json 的 workspacePaths 指向這台 PC 的路徑
$sjPath = Join-Path $destSess 'session.json'
$sj = Get-Content $sjPath -Raw -Encoding UTF8 | ConvertFrom-Json
$sj.workspacePaths = @($WorkspacePath)
($sj | ConvertTo-Json -Depth 20) | Set-Content -Path $sjPath -Encoding UTF8
Write-Host "已更新 workspacePaths -> $WorkspacePath" -ForegroundColor Green

Write-Host ""
Write-Host "=== 完成！接下來 ===" -ForegroundColor Cyan
Write-Host "1) 確認你的專案資料夾就放在：$WorkspacePath"
Write-Host "   （建議直接 git clone 你的 repo 到這個路徑）"
Write-Host "2) 完全關閉 Kiro，再重新開啟"
Write-Host "3) 用 Kiro 開啟該資料夾為工作區，對話『CLAUDE / PPA』就會出現在 session 列表"
Write-Host ""
Write-Host "（若沒出現：確認路徑大小寫、以及 Kiro 是否用同一帳號登入）" -ForegroundColor DarkGray
