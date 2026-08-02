# FIFOKIT Jobs Pipeline

## Overview

The FIFO jobs board is updated through a semi-automated workflow.

SEEK Scraper
↓
Airtable
↓
Review / Approve
↓
build_jobs_js.py
↓
jobs-data.js
↓
Website

---

## Files

### Scraper

seek_scraper.py

Collects FIFO jobs from SEEK and produces a standard jobs list.

### Airtable Sync

sync_jobs_to_airtable.py

Responsibilities:

- Generate Job Key
- Generate Duplicate Key
- Insert new jobs
- Update Last Checked
- Detect reposted jobs
- Expire old jobs

### Publisher

build_jobs_js.py

Responsibilities:

- Read approved Airtable jobs
- Generate jobs-data.js
- Publish only Active + Visible jobs

### Website

jobs-data.js

Generated automatically.

Never edit manually.

jobs.js

Rendering, filtering and UI logic.

jobs.html

Jobs board page.

---

## Airtable Statuses

Pending Review

New jobs inserted by scraper.

Visible = false

Active

Approved jobs shown on website.

Visible = true

Expired

Jobs no longer found.

Visible = false

Rejected

Duplicate or unsuitable jobs.

Visible = false

---

## Airtable Keys

### Job Key

title|company|location|applyUrl

Used for exact job matching.

### Duplicate Key

title|company|location

Used for repost detection.

---

## Daily Update Process

Run:

update_jobs.bat

This will:

1. Scrape SEEK
2. Sync Airtable
3. Update Last Checked
4. Insert new Pending Review jobs
5. Expire old jobs
6. Generate jobs-data.js

---

## Publishing New Jobs

1. Open Airtable
2. Review Pending Review view
3. Set good jobs:
   - Status = Active
   - Visible = true
4. Run update_jobs.bat
5. Commit changes
6. Push to GitHub

---

## Future Improvements

- Additional job sources
- Salary normalisation
- Recruiter detection
- Company profiles
- Email alerts
- Supabase migration