$Repo = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 4173
$Python = Get-Command python -ErrorAction SilentlyContinue

if (-not $Python) {
  Write-Host "Python is required to run the local web server."
  exit 1
}

Start-Process `
  -FilePath "python" `
  -ArgumentList "-m", "http.server", "$Port", "--bind", "127.0.0.1" `
  -WorkingDirectory $Repo `
  -WindowStyle Hidden

Start-Sleep -Seconds 1
Write-Host "Web app is running at http://127.0.0.1:$Port"
