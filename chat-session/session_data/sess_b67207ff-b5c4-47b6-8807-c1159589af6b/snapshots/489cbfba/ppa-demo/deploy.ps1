$ErrorActionPreference = 'Stop'
$env:Path += ";C:\Program Files\Amazon\AWSCLIV2"
Add-Type -AssemblyName System.IO.Compression.FileSystem
$appId = 'd17rjg8zasvsbn'
$root  = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist  = Join-Path $root 'dist'
$zip   = Join-Path $root 'deploy.zip'

$branch = (aws amplify list-branches --app-id $appId --query "branches[0].branchName" --output text).Trim()
Write-Output "branch=$branch"

if (Test-Path $zip) { Remove-Item $zip -Force }
# 用 CreateFromDirectory：dist 內容放在 zip 根（index.html 在根、assets/ 在根）
[System.IO.Compression.ZipFile]::CreateFromDirectory($dist, $zip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

Write-Output "--- zip entries ---"
$z = [System.IO.Compression.ZipFile]::OpenRead($zip)
$z.Entries | Select-Object -First 12 | ForEach-Object { Write-Output ("  " + $_.FullName) }
$z.Dispose()

$dep = aws amplify create-deployment --app-id $appId --branch-name $branch --output json | ConvertFrom-Json
$jobId = $dep.jobId
Write-Output "jobId=$jobId"
Invoke-RestMethod -Method Put -Uri $dep.zipUploadUrl -InFile $zip -ContentType 'application/zip' | Out-Null
Write-Output "uploaded"
aws amplify start-deployment --app-id $appId --branch-name $branch --job-id $jobId --output json | Out-Null

for ($i=0; $i -lt 20; $i++) {
  Start-Sleep -Seconds 3
  $s = (aws amplify get-job --app-id $appId --branch-name $branch --job-id $jobId --query "job.summary.status" --output text).Trim()
  Write-Output ("status=" + $s)
  if ($s -eq 'SUCCEED' -or $s -eq 'FAILED' -or $s -eq 'CANCELLED') { break }
}
Remove-Item $zip -Force
Write-Output "live=https://$branch.$appId.amplifyapp.com/"
