@echo off
title Auto-Deploy Ellyz Gomez Portfolio
echo ========================================================
echo   Auto-Syncing and Deploying Portfolio to Live Website...
echo ========================================================
echo.

git add .
git commit -m "Auto-update portfolio: %date% %time%"
git push origin main

echo.
echo ========================================================
echo   Done! Your live website is updating automatically.
echo ========================================================
timeout /t 3
