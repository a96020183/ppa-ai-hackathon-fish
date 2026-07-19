$ErrorActionPreference='Stop'
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
$files=@('計畫書.docx','aws.docx','awsv1.docx')
foreach($f in $files){
  $p=Join-Path 'C:\Users\Fung N2\AWS' $f
  Write-Output "===== $f ====="
  Get-DocxText $p
  Write-Output ""
}