from pathlib import Path
from dotenv import load_dotenv
from pyairtable import Api
from datetime import date, datetime, timedelta
import asyncio
from seek_scraper import scrape_seek_jobs
import os
from pyairtable.formulas import match


ENV_FILE = Path(__file__).resolve().parent / ".env"
load_dotenv(ENV_FILE)


AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.getenv("AIRTABLE_TABLE_NAME")


api = Api(AIRTABLE_API_KEY)

table = api.table(
    AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_NAME
)


def find_job_by_key(job_key):

    formula = match({
        "Job Key": job_key
    })

    records = table.all(formula=formula)

    if records:
        return records[0]

    return None

def find_job_by_duplicate_key(duplicate_key):

    formula = match({
        "Duplicate Key": duplicate_key
    })

    records = table.all(formula=formula)

    if records:
        return records[0]

    return None

def create_job_key_from_fields(fields):
    raw_key = f"{fields.get('Title', '')}|{fields.get('Company', '')}|{fields.get('Location', '')}|{fields.get('Apply URL', '')}"
    return raw_key.lower().strip()

def create_job_key(job):
    raw_key = f"{job['title']}|{job['company']}|{job['location']}|{job['applyUrl']}"
    return raw_key.lower().strip()

def create_duplicate_key(job):

    raw_key = (
        f"{job['title']}|"
        f"{job['company']}|"
        f"{job['location']}"
    )

    return raw_key.lower().strip()

def backfill_missing_job_keys():
    records = table.all()

    for record in records:
        fields = record["fields"]

        if fields.get("Job Key"):
            continue

        job_key = create_job_key_from_fields(fields)

        table.update(record["id"], {
            "Job Key": job_key
        })

        print("Updated:", job_key)

def sync_scraped_job(job):
    today = date.today().isoformat()

    job_key = create_job_key(job)

    duplicate_key = create_duplicate_key(job)

    existing = find_job_by_key(job_key)

    if existing:
        table.update(existing["id"], {
            "Last Checked": today
        })

        print("Existing job checked:", job["title"])
        return
    
    duplicate = find_job_by_duplicate_key(duplicate_key)

    if duplicate:
        table.update(duplicate["id"], {
            "Last Checked": today,
            "Apply URL": job["applyUrl"]
        })

        print("Duplicate job updated:", job["title"])
        return

    table.create({
        "Job Key": job_key,
        "Title": job["title"],
        "Company": job["company"],
        "Location": job["location"],
        "Roster": job["roster"],
        "Category": job["category"],
        "Experience": job["experience"],
        "Beginner Friendly": job["beginnerFriendly"],
        "Tickets": job["tickets"],
        "Salary": job["salary"],
        "Source": job["source"],
        "Date Added": today,
        "Last Checked": today,
        "Status": "Pending Review",
        "Visible": False,
        "Apply URL": job["applyUrl"],
        "Duplicate Key": duplicate_key,
    })

    print("Inserted pending job:", job["title"])

def expire_old_jobs(days=7):

    cutoff = date.today() - timedelta(days=days)

    records = table.all()

    for record in records:

        fields = record["fields"]

        if fields.get("Status") != "Active":
            continue

        last_checked = fields.get("Last Checked")

        if not last_checked:
            continue

        last_checked_date = datetime.strptime(
            last_checked,
            "%Y-%m-%d"
        ).date()

        if last_checked_date < cutoff:

            table.update(
                record["id"],
                {
                    "Status": "Expired",
                    "Visible": False,
                    "Expiry Date": date.today().isoformat()
                }
            )

            print(
                "Expired:",
                fields.get("Title")
            )

def expire_old_jobs(days=7):

    cutoff = date.today() - timedelta(days=days)

    records = table.all()

    for record in records:

        fields = record["fields"]

        if fields.get("Status") != "Active":
            continue

        last_checked = fields.get("Last Checked")

        if not last_checked:
            continue

        last_checked_date = datetime.strptime(
            last_checked,
            "%Y-%m-%d"
        ).date()

        if last_checked_date < cutoff:

            table.update(
                record["id"],
                {
                    "Status": "Expired",
                    "Visible": False,
                    "Expiry Date": date.today().isoformat()
                }
            )

            print("Expired:", fields.get("Title"))

def create_duplicate_key_from_fields(fields):

    raw_key = (
        f"{fields.get('Title', '')}|"
        f"{fields.get('Company', '')}|"
        f"{fields.get('Location', '')}"
    )

    return raw_key.lower().strip()

def backfill_missing_duplicate_keys():

    records = table.all()

    for record in records:
        fields = record["fields"]

        if fields.get("Duplicate Key"):
            continue

        duplicate_key = create_duplicate_key_from_fields(fields)

        table.update(record["id"], {
            "Duplicate Key": duplicate_key
        })

        print("Updated duplicate key:", duplicate_key)

async def main():

    backfill_missing_duplicate_keys()
    scraped_jobs = await scrape_seek_jobs()

    print(f"Scraped {len(scraped_jobs)} jobs")

    for job in scraped_jobs:
        sync_scraped_job(job)

    expire_old_jobs(days=7)


if __name__ == "__main__":
    asyncio.run(main())