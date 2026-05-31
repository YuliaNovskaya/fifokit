# FIFOKIT CRM Workflow

## Overview

FIFOKIT uses a central CRM structure to ensure that one email address represents one person, regardless of how many FIFOKIT tools they use.

Current lead sources:

* FIFO Jobs Board
* FIFO Calendar Export
* Future Starter Pack purchases
* Future calculators and tools

---

## Airtable Structure

### Base: FIFOKIT CRM

Tables:

#### Contacts

Master customer table.

One record per email address.

Fields:

* Contact ID
* Email
* Email Normalized
* First Seen
* Status
* Source First
* Source Last
* Calendar Interest
* Jobs Interest
* Starter Pack Interest
* Total Activities
* Last Activity

Purpose:

Acts as the single source of truth for all FIFOKIT users.

---

#### Calendar PDF Requests

Stores calendar export activity.

Fields:

* Email
* Roster Type
* Roster Start Date
* Request Date

Purpose:

Tracks how users interact with the FIFO Calendar tool.

---

#### Job Alert Preferences

Stores job alert subscriptions.

Fields:

* Email
* Category Interest
* Status
* Created Time

Purpose:

Tracks which FIFO job categories users want to receive.

Examples:

* Utility Worker
* Trade Assistant
* Driller's Offsider
* Site Administrator
* Underground Nipper
* All

---

#### Orders

Stores future purchases.

Fields:

* Email
* Product
* Amount
* Order Date
* Status

Purpose:

Tracks Starter Pack and future product sales.

---

### Base: FIFOKIT Jobs

Tables:

#### WA_FIFO_JOBS

Purpose:

Stores FIFO job records collected by the scraper.

This base is intentionally separated from CRM data.

---

## Jobs Signup Workflow

jobs.html

↓

Make Webhook

↓

Search Contacts

↓

Router

### Existing Contact

* Update Contact
* Jobs Interest = true
* Source Last = jobs-page
* Last Activity = current time

↓

Create Job Alert Preference

↓

Send Welcome Email

### New Contact

* Create Contact
* Status = Active
* Source First = jobs-page
* Source Last = jobs-page
* Jobs Interest = true
* Last Activity = current time

↓

Create Job Alert Preference

↓

Send Welcome Email

---

## Calendar Workflow

Calendar Export

↓

Make Webhook

↓

Search Contacts

↓

Router

### Existing Contact

* Update Contact
* Calendar Interest = true
* Source Last = calendar-page
* Last Activity = current time

↓

Create Calendar PDF Request

↓

Send Confirmation Email

### New Contact

* Create Contact
* Status = Active
* Source First = calendar-page
* Source Last = calendar-page
* Calendar Interest = true
* Last Activity = current time

↓

Create Calendar PDF Request

↓

Send Confirmation Email

---

## FIFO Jobs Pipeline

SEEK Scraper

↓

sync_jobs_to_airtable.py

↓

Airtable (WA_FIFO_JOBS)

↓

Review / Approve

↓

build_jobs_js.py

↓

jobs-data.js

↓

Website

---

## Job Statuses

Pending Review

New jobs awaiting approval.

Visible = false

Active

Approved jobs shown on website.

Visible = true

Expired

Jobs no longer found by scraper.

Visible = false

Rejected

Duplicate or unsuitable jobs.

Visible = false

---

## Job Keys

### Job Key

title|company|location|applyUrl

Purpose:

Detect exact job advertisements.

### Duplicate Key

title|company|location

Purpose:

Detect reposted jobs and duplicate listings.

---

## Future Enhancements

* Weekly FIFO job email digest
* Category-specific job alerts
* Starter Pack purchases
* Course sales
* User accounts
* Mobile app integration
* CRM analytics
* Email unsubscribe workflow
* Email engagement tracking
