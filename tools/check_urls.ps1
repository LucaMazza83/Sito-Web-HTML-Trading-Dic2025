param(
  [string]$BaseUrl = "https://doptrading.it"
)

$paths = @(
  "/",
  "/waitlist/",
  "/privacy-policy/",
  "/cookie-policy/",
  "/termini-e-condizioni/",
  "/disclaimer-trading/"
)

$base = $BaseUrl.TrimEnd("/")
$allOk = $true

foreach ($path in $paths) {
  if ($path -eq "/") {
    $url = $base + "/"
  } else {
    $url = $base + $path
  }

  $code = & curl.exe -s -o NUL -L -w "%{http_code}" --connect-timeout 10 --max-time 20 $url 2>$null

  if ($code -eq "200") {
    Write-Output ("OK 200  {0}" -f $url)
  } else {
    Write-Output ("FAIL {0} {1}" -f $code, $url)
    $allOk = $false
  }
}

if ($allOk) { exit 0 }
exit 1
