$ErrorActionPreference = 'Stop'
$owner='a96020183'; $repo='ppa-ai-hackathon-fish'; $u='0978632024'
$inp="protocol=https`nhost=github.com`n`n"
$cred=$inp | git credential fill 2>$null
$token=($cred | Where-Object { $_ -like 'password=*' }) -replace '^password=',''
$headers=@{ Authorization="Bearer $token"; 'User-Agent'='kiro-agent'; Accept='application/vnd.github+json' }

# force permission to read (pull) -- explicit JSON content type
Invoke-RestMethod -Method Put -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$u" -Headers $headers -ContentType 'application/json' -Body '{"permission":"pull"}' | Out-Null

$perm = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/collaborators/$u/permission" -Headers $headers
Write-Output ("permission=" + $perm.permission + " role_name=" + $perm.role_name)
