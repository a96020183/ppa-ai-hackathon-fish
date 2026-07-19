$ErrorActionPreference='Stop'
[Console]::OutputEncoding=[System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem
function Get-DocxText($path){
  $zip=[System.IO.Compression.ZipFile]::OpenRead($path)
  $entry=$zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
  $reader=New-Object System.IO.StreamReader($entry.Open())
  $xml=$reader.ReadToEnd()
  $reader.Close(); $zip.Dispose()
  $xml=$xml -replace '</w:p>',"`n"
  $xml=$xml -replace '<[^>]+>',''
  $xml=[System.Net.WebUtility]::HtmlDecode($xml)
  return $xml
}
$files=Get-ChildItem -Path 'C:\Users\Fung N2\AWS' -Filter *.docx
foreach($f in $files){
  Write-Output "===== $($f.Name) ====="
  Get-DocxText $f.FullName
  Write-Output ""
}