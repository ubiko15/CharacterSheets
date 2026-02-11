@echo off
echo ====================================
echo  Character Sheets - Server Stopper
echo ====================================
echo.

echo Stoppe alle Server...

REM Stoppe PHP Server
taskkill /FI "WINDOWTITLE eq PHP-Backend*" /T /F >nul 2>&1

REM Stoppe Vite Server
taskkill /FI "WINDOWTITLE eq Vite-Frontend*" /T /F >nul 2>&1

REM Stoppe Cloudflare Tunnel
taskkill /FI "WINDOWTITLE eq Cloudflare-Tunnel*" /T /F >nul 2>&1

REM Alternative: Stoppe alle Node.js und PHP Prozesse (falls die Fenster-Methode nicht funktioniert)
REM taskkill /IM node.exe /F >nul 2>&1
REM taskkill /IM php.exe /F >nul 2>&1
REM taskkill /IM cloudflared.exe /F >nul 2>&1

echo.
echo Alle Server wurden gestoppt.
echo.
pause
