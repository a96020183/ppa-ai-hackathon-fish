# Add a read-only collaborator using locally-stored GitHub credentials
$ErrorActionPreference = 'Stop'
$owner = 'a96020183'
$repo  = 'ppa-ai-hackathon-fish'
$invitee = '0978632024'

$inp  = "protocol=https`nhost=github.com`n`n"
$cred = $inp | git credential fill 2>$null
$token = ($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=',''
if (-not $token) { Write-Output 'NO_TOKEN'; exit 3 }

$headers = @{
  Authorization = "Bearer $token"
  'User-Agent'  = 'kiro-agent'
  Accept        = 'application/vnd.github+json'
}

$userOk = $true
try { Invoke-RestMethod -Uri "https://api.github.com/users/$invitee" -Headers $headers | Out-Null }
catch { $userOk = $false }
Write-Output ("USER_EXISTS: " + $userOk)

if (-not $userOk) { Write-Output 'RESULT: user_not_found'; exit 4 }

try {
  $resp = Invoke-RestMethod -Method Put -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$invitee" -Headers $headers -Body '{"permission":"pull"}'
  if ($resp -and $resp.html_url) { Write-Output ("RESULT: invited " + $resp.html_url) }
  else { Write-Output 'RESULT: added_or_already_member' }
}
catch {
  $code = $_.Exception.Response.StatusCode.value__
  Write-Output ("API_ERROR: HTTP " + $code)
}
