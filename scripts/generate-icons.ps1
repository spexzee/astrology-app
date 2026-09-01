Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\..\src\assets\logo.png")
$dest = New-Object System.Drawing.Bitmap(256, 256)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, 256, 256)
$g.Dispose()

$dest.Save("$PSScriptRoot\..\src\assets\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Save("$PSScriptRoot\..\build\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Save as ICO
$hIcon = $dest.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream("$PSScriptRoot\..\src\assets\icon.ico", [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()

$fs2 = New-Object System.IO.FileStream("$PSScriptRoot\..\build\icon.ico", [System.IO.FileMode]::Create)
$icon.Save($fs2)
$fs2.Close()

$dest.Dispose()
$src.Dispose()
Write-Host "Generated 256x256 icon.png and icon.ico successfully!"
