$ErrorActionPreference = 'Stop'
$owner='a96020183'; $repo='ppa-ai-hackathon-fish'; $u='0978632024'
$inp="protocol=https`nhost=github.com`n`n"
$cred=$inp | git credential fill 2>$null
$token=($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=',''
$headers=@{ Authorization="Bearer $token"; 'User-Agent'='kiro-agent'; Accept='application/vnd.github+json' }

# force permission to read (pull)
Invoke-RestMethod -Method Put -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$u" -Headers $headers -Body '{"permission":"pull"}' | Out-Null

# authoritative permission check
$perm = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$u/permission" -Headers $headers
Write-Output ("permission=" + $perm.permission + " role_name=" + $perm.role_name)

Write-Output '--- invitations ---'
$inv = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/invitations" -Headers $headers
if ($inv) { $inv | ForEach-Object { Write-Output ("pending invitee=" + $_.invitee.login + " perm=" + $_.permissions) } } else { Write-Output '(no pending invites)' }
