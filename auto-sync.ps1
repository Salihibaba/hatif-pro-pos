param(
  [int]$IntervalSeconds = 30,
  [string]$Branch = "main",
  [string]$Remote = "origin",
  [string]$MessagePrefix = "Auto sync"
)

$ErrorActionPreference = "Continue"
$Repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Repo

Write-Host "Auto sync started for $Repo"
Write-Host "Remote: $Remote/$Branch"
Write-Host "Interval: $IntervalSeconds seconds"
Write-Host "Press Ctrl+C to stop."

while ($true) {
  $gitDir = Join-Path $Repo ".git"
  $rebaseMerge = Join-Path $gitDir "rebase-merge"
  $rebaseApply = Join-Path $gitDir "rebase-apply"
  $mergeHead = Join-Path $gitDir "MERGE_HEAD"

  if ((Test-Path $rebaseMerge) -or (Test-Path $rebaseApply) -or (Test-Path $mergeHead)) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') Git is in merge/rebase state. Resolve it manually, then restart auto sync."
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  $status = git status --porcelain
  if ($LASTEXITCODE -ne 0) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') Could not read git status."
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  if ([string]::IsNullOrWhiteSpace(($status -join "`n"))) {
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') Changes detected. Saving to GitHub..."

  git add -A
  if ($LASTEXITCODE -ne 0) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') git add failed."
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  $staged = git diff --cached --name-only
  if ([string]::IsNullOrWhiteSpace(($staged -join "`n"))) {
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  git commit -m "$MessagePrefix $stamp"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') git commit failed."
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  git pull --rebase $Remote $Branch
  if ($LASTEXITCODE -ne 0) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') git pull --rebase failed. Resolve manually before pushing."
    Start-Sleep -Seconds $IntervalSeconds
    continue
  }

  git push $Remote $Branch
  if ($LASTEXITCODE -eq 0) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') Changes pushed successfully."
  } else {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') git push failed."
  }

  Start-Sleep -Seconds $IntervalSeconds
}
