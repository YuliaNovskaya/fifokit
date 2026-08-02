@echo off

echo Generating jobs-data.js from approved Airtable jobs...
python jobs\build_jobs_js.py

echo.
echo jobs-data.js updated.
pause