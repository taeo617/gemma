param(
  [string]$Model = ""
)

$ErrorActionPreference = "Stop"

Write-Host "1) Checking Ollama installation..."
$ollamaCmd = Get-Command ollama -ErrorAction SilentlyContinue

if (-not $ollamaCmd) {
  Write-Host "Ollama not found. Installing with winget..."
  winget install -e --id Ollama.Ollama --accept-package-agreements --accept-source-agreements
  $env:Path += ";$env:LOCALAPPDATA\Programs\Ollama"
}

if ([string]::IsNullOrWhiteSpace($Model)) {
  $gpuInfoRaw = & nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits 2>$null
  $vramMiB = 0
  if ($gpuInfoRaw) {
    $first = ($gpuInfoRaw | Select-Object -First 1).Trim()
    [void][int]::TryParse($first, [ref]$vramMiB)
  }

  if ($vramMiB -ge 7800) {
    $Model = "gemma4:e4b"
  } else {
    $Model = "gemma4:e2b"
  }

  Write-Host "Auto-selected model by VRAM ($vramMiB MiB): $Model"
}

Write-Host "2) Starting Ollama app/service if needed..."
Start-Process "ollama" -ArgumentList "serve" -WindowStyle Hidden -ErrorAction SilentlyContinue | Out-Null
Start-Sleep -Seconds 3

Write-Host "3) Pulling model: $Model"
ollama pull $Model

Write-Host "4) Quick smoke test..."
$test = ollama run $Model "Say only: setup success"
Write-Host "Model reply: $test"

Write-Host ""
Write-Host "Done. You can start web chat with:"
Write-Host "  node server.js"
