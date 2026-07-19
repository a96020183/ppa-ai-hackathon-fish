$ErrorActionPreference = 'Stop'
$env:Path += ";C:\Program Files\Amazon\AWSCLIV2"
$appId = 'd17rjg8zasvsbn'

$branch = (aws amplify list-branches --app-id $appId --query "branches[0].branchName" --output text).Trim()
Write-Output "branch=$branch"

$zip = Join-Path (Get-Location) 'deploy.zip'
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path (Get-Location) 'dist\*') -DestinationPath $zip -Force
Write-Output "zip created"

$dep = aws amplify create-deployment --app-id $appId --branch-name $branch --output json | ConvertFrom-Json
$jobId = $dep.jobId
$url = $dep.zipUploadUrl
Write-Output "jobId=$jobId"

Invoke-RestMethod -Method Put -Uri $url -InFile $zip -ContentType 'application/zip' | Out-Null
Write-Output "uploaded"

$res = aws amplify start-deployment --app-id $appId --branch-name $branch --job-id $jobId --output json | ConvertFrom-Json
Write-Output ("start status=" + $res.jobSummary.status)
Write-Output ("live url=https://$branch.$appId.amplifyapp.com/")
Remove-Item $zip -Force
