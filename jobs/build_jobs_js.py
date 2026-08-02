import json
import pandas as pd
import os
from pathlib import Path
from dotenv import load_dotenv
from pyairtable import Api


INPUT_CSV = "wa_fifo_jobs.csv"
OUTPUT_JS = Path(__file__).resolve().parent.parent / "jobs-data.js"


def parse_bool(value):
    if pd.isna(value):
        return False

    return str(value).strip().lower() in ["true", "yes", "1", "checked"]


def parse_tickets(value):
    if pd.isna(value) or str(value).strip() == "":
        return []

    return [ticket.strip() for ticket in str(value).split(",") if ticket.strip()]




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

jobs = []

records = table.all(
    formula="AND({Visible}=TRUE(), {Status}='Active')"
)

for record in records:
    row = record["fields"]
    jobs.append({
        "jobKey": str(row.get("Job Key", "")).strip(),
        "title": str(row.get("Title", "")).strip(),
        "company": str(row.get("Company", "")).strip(),
        "location": str(row.get("Location", "")).strip(),
        "roster": str(row.get("Roster", "")).strip(),
        "category": str(row.get("Category", "")).strip(),
        "experience": str(row.get("Experience", "")).strip(),
        "beginnerFriendly": bool(row.get("Beginner Friendly", False)),
        "tickets": row.get("Tickets", []),
        "salary": str(row.get("Salary", "")).strip(),
        "source": str(row.get("Source", "")).strip(),
        "dateAdded": str(row.get("Date Added", "")).strip(),
        "lastChecked": str(row.get("Last Checked", "")).strip(),
        "status": str(row.get("Status", "")).strip(),
        "applyUrl": str(row.get("Apply URL", "")).strip(),
    })


js_content = "const jobs = "
js_content += json.dumps(jobs, indent=2, ensure_ascii=False)
js_content += ";\n"

with open(OUTPUT_JS, "w", encoding="utf-8") as file:
    file.write(js_content)

print(f"Created {OUTPUT_JS} with {len(jobs)} active jobs.")