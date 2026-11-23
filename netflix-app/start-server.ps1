<#
.SYNOPSIS
  StreamFlix Local Streaming Server with HTTP Range Request (206 Partial Content) Support.
  Allows smooth video seeking and streaming without buffering the entire file.

.USAGE
  powershell -ExecutionPolicy Bypass -File .\start-server.ps1
#>

param(
    [int]$Port = 5000,
    [string]$Directory = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "  🍿 STREAMFLIX LOCAL STREAMING SERVER AKTIF" -ForegroundColor White
    Write-Host "  URL: $prefix" -ForegroundColor Green
    Write-Host "  Mendukung HTTP Range Requests (206 Partial Content) untuk Video Streaming" -ForegroundColor Yellow
    Write-Host "  Tekan Ctrl+C untuk menghentikan server." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Red

    # Otomatis buka browser
    Start-Process $prefix
} catch {
    Write-Host "Gagal memulai server di port $Port. Coba port lain atau periksa izin." -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "application/javascript; charset=utf-8";
    ".json" = "application/json; charset=utf-8";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".svg"  = "image/svg+xml";
    ".mp4"  = "video/mp4";
    ".webm" = "video/webm";
    ".mkv"  = "video/x-matroska";
    ".m3u8" = "application/vnd.apple.mpegurl";
    ".ts"   = "video/mp2t";
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS Headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Range, Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) {
            $localPath = "index.html"
        }

        $filePath = Join-Path $Directory $localPath

        if (-not (Test-Path $filePath -PathType Leaf)) {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = $mimeTypes[$extension]
        if (-not $contentType) {
            $contentType = "application/octet-stream"
        }
        $response.ContentType = $contentType
        $response.AddHeader("Accept-Ranges", "bytes")

        $fileInfo = New-Object System.IO.FileInfo($filePath)
        $fileLength = $fileInfo.Length

        # Support Range Requests for Video Streaming (206 Partial Content)
        $rangeHeader = $request.Headers["Range"]
        if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
            $range = $rangeHeader.Substring(6).Split('-')
            [long]$start = 0
            [long]$end = $fileLength - 1

            if (-not [string]::IsNullOrEmpty($range[0])) {
                $start = [long]::Parse($range[0])
            }
            if ($range.Length -gt 1 -and -not [string]::IsNullOrEmpty($range[1])) {
                $end = [long]::Parse($range[1])
            }

            if ($end -ge $fileLength) {
                $end = $fileLength - 1
            }

            $contentLength = $end - $start + 1
            $response.StatusCode = 206 # Partial Content
            $response.AddHeader("Content-Range", "bytes $start-$end/$fileLength")
            $response.ContentLength64 = $contentLength

            $fileStream = [System.IO.File]::OpenRead($filePath)
            $fileStream.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null

            $bufferSize = 64 * 1024
            $buffer = New-Object byte[] $bufferSize
            [long]$bytesRemaining = $contentLength

            while ($bytesRemaining -gt 0) {
                $bytesToRead = [Math]::Min($bytesRemaining, $bufferSize)
                $bytesRead = $fileStream.Read($buffer, 0, $bytesToRead)
                if ($bytesRead -le 0) { break }
                $response.OutputStream.Write($buffer, 0, $bytesRead)
                $bytesRemaining -= $bytesRead
            }

            $fileStream.Close()
        } else {
            $response.StatusCode = 200
            $response.ContentLength64 = $fileLength

            if ($request.HttpMethod -ne "HEAD") {
                $fileStream = [System.IO.File]::OpenRead($filePath)
                $fileStream.CopyTo($response.OutputStream)
                $fileStream.Close()
            }
        }

        $response.Close()
    } catch {
        # Abaikan aborts dari client saat seeking
    }
}
