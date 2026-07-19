$ErrorActionPreference = 'Stop'
$owner = 'a96020183'; $repo = 'ppa-ai-hackathon-fish'
$inp  = "protocol=https`nhost=github.com`n`n"
$cred = $inp | git credential fill 2>$null
$token = ($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=',''
$headers = @{ Authorization = "Bearer $token"; 'User-Agent'='kiro-agent'; Accept='application/vnd.github+json' }

Write-Output '--- pending invitations ---'
$inv = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/invitations" -Headers $headers
if ($inv) { $inv | ForEach-Object { Write-Output ("invitee=" + $_.invitee.login + " permission=" + $_.permissions + " url=" + $_.html_url) } } else { Write-Output '(none)' }

Write-Output '--- current collaborators ---'
$col = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/collaborators" -Headers $headers
$col | ForEach-Object { Write-Output ("login=" + $_.login + " role=" + $_.role_name) }
