@echo off
chcp 65001 >nul
echo ====================================
echo  Character Sheets - Server Starter
echo ====================================
echo.

echo [DEBUG] Pruefe Voraussetzungen...
echo.

REM Pruefe ob cloudflared installiert ist (im PATH oder im Projektordner)
set "CLOUDFLARED_CMD="
where cloudflared >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "CLOUDFLARED_CMD=cloudflared"
    echo [OK] cloudflared gefunden im PATH
) else (
    if exist "%~dp0cloudflared.exe" (
        set "CLOUDFLARED_CMD=%~dp0cloudflared.exe"
        echo [OK] cloudflared.exe gefunden im Projektordner
    ) else (
        echo [FEHLER] cloudflared ist nicht installiert!
        echo.
        echo cloudflared wurde weder im PATH noch im Projektordner gefunden.
        echo.
        echo Bitte installiere cloudflared:
        echo 1. Gehe zu: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
        echo 2. Lade cloudflared-windows-amd64.exe herunter
        echo 3. Benenne es um zu cloudflared.exe
        echo 4. Lege es in diesen Projektordner: %~dp0
        echo    ODER in C:\Windows\System32
        echo.
        echo Aktueller Ordner: %~dp0
        echo.
        pause
        exit /b 1
    )
)

REM Pruefe ob PHP installiert ist
where php >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] PHP ist nicht installiert oder nicht im PATH!
    echo.
    echo Bitte installiere PHP von https://www.php.net/downloads
    echo Oder fuege den PHP-Ordner zum PATH hinzu.
    echo.
    pause
    exit /b 1
) else (
    echo [OK] PHP gefunden
)

REM Pruefe ob npm installiert ist
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] npm ist nicht installiert oder nicht im PATH!
    echo.
    echo Bitte installiere Node.js von https://nodejs.org/
    echo.
    pause
    exit /b 1
) else (
    echo [OK] npm gefunden
)

echo.
echo ====================================
echo  Alle Voraussetzungen erfuellt!
echo ====================================
echo.

echo [1/4] Starte PHP Backend Server (Port 8000)...
cd /d "%~dp0backend"
start "PHP-Backend" cmd /k "echo PHP Backend laeuft auf Port 8000 & php -S localhost:8000"

timeout /t 2 /nobreak >nul

echo [2/4] Starte Vite Frontend Server (Port 5173)...
cd /d "%~dp0frontend"
start "Vite-Frontend" cmd /k "echo Vite Frontend laeuft auf Port 5173 & npm run dev"

timeout /t 5 /nobreak >nul

echo [3/4] Starte Cloudflare Tunnel...
cd /d "%~dp0"
start "Cloudflare-Tunnel" cmd /k "%CLOUDFLARED_CMD% tunnel --url http://localhost:5173"

timeout /t 3 /nobreak >nul

echo.
echo ====================================
echo  Alle Server gestartet!
echo ====================================
echo.
echo Lokaler Zugriff:     http://localhost:5173
echo.
echo WICHTIG: Schaue im "Cloudflare-Tunnel" Fenster nach der oeffentlichen URL!
echo Sie sieht ungefaehr so aus: https://xxxx-xxx-xxx-xxx.trycloudflare.com
echo.
echo Die URL aendert sich bei jedem Neustart.
echo Teile diese URL mit deinen Freunden fuer den Zugriff!
echo.
echo Zum Beenden: stop.bat ausfuehren oder alle Fenster schliessen
echo ====================================
echo.
pause
