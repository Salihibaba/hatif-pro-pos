$Repo = Split-Path -Parent $MyInvocation.MyCommand.Path
$Script = Join-Path $Repo "auto-sync.ps1"

Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "`"$Script`"" `
  -WorkingDirectory $Repo `
  -WindowStyle Hidden

Write-Host "Auto sync is running in the background."
