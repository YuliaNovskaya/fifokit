@echo off

echo Running SEEK scraper and syncing Airtable...
python jobs\sync_jobs_to_airtable.py

echo.
echo Generating jobs-data.js from approved Airtable jobs...
python jobs\build_jobs_js.py

echo.
echo Jobs pipeline completed.
pause