# 用本機已存的 GitHub 認證，將指定使用者加為 repo 協作者（唯讀）
$ErrorActionPreference = 'Stop'
$owner = 'a96020183'
$repo  = 'ppa-ai-hackathon-fish'
$invitee = '0978632024'   # 朋友的 GitHub 帳號

# 1) 從 Git 認證管理員取出 github.com 的 token（不印出）
$input = "protocol=https`nhost=github.com`n`n"
$cred  = $input | git credential fill 2>$null
$token = ($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=',''
if (-not $token) { Write-Output "NO_TOKEN"; exit 3 }

$headers = @{
  Authorization = "Bearer $token"
  'User-Agent'  = 'kiro-agent'
  Accept        = 'application/vnd.github+json'
}

# 2) 先確認該使用者是否存在
$userOk = $true
try { Invoke-RestMethod -Uri "https://api.github.com/users/$invitee" -Headers $headers | Out-Null }
catch { $userOk = $false }
Write-Output ("USER_EXISTS: " + $userOk)

if (-not $userOk) {
  Write-Output "==> 找不到這個 GitHub 帳號，可能不是正確 username。請改用 email 或確認帳號。"
  exit 4
}

# 3) 加為協作者（pull = 唯讀）
try {
  $resp = Invoke-RestMethod -Method Put `
    -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$invitee" `
    -Headers $headers -Body '{"permission":"pull"}'
  if ($resp -and $resp.html_url) {
    Write-Output ("INVITED_OK: 已送出邀請 -> " + $resp.html_url)
  } else {
    Write-Output "ADDED_OK: 對方可能已是協作者或直接加入成功"
  }
} catch {
  $code = $_.Exception.Response.StatusCode.value__
  Write-Output ("API_ERROR: HTTP " + $code + " - " + $_.Exception.Message)
}
