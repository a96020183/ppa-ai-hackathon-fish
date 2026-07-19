$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
function Get-DocxText($path){
  $zip=[System.IO.Compression.ZipFile]::OpenRead($path)
  $entry=$zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
  $reader=New-Object System.IO.StreamReader($entry.Open(),[System.Text.Encoding]::UTF8)
  $xml=$reader.ReadToEnd()
  $reader.Close(); $zip.Dispose()
  $xml=$xml -replace '</w:p>',"`n"
  $xml=$xml -replace '<[^>]+>',''
  $xml=[System.Net.WebUtility]::HtmlDecode($xml)
  return $xml
}
$sb=New-Object System.Text.StringBuilder
$files=Get-ChildItem -Path 'C:\Users\Fung N2\AWS' -Filter *.docx
foreach($f in $files){
  [void]$sb.AppendLine("===== $($f.Name) =====")
  [void]$sb.AppendLine((Get-DocxText $f.FullName))
  [void]$sb.AppendLine("")
}
$utf8=New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText('C:\Users\Fung N2\AWS\sso\docx_text.txt',$sb.ToString(),$utf8)
Write-Output 'DONE'