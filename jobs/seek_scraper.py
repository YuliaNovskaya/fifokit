# %%
import re
import json
import asyncio
from datetime import date
from urllib.parse import urlencode, urljoin
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import pandas as pd


# %%
SEARCH_TARGETS = [
    {
        "keyword": "FIFO Utility Worker",
        "category": "utility-worker",
        "experience": "entry",
        "limit": 20,
    },
    {
        "keyword": "FIFO Trade Assistant",
        "category": "trade-assistant",
        "experience": "entry",
        "limit": 20,
    },
    {
        "keyword": "FIFO Driller Offsider",
        "category": "drillers-offsider",
        "experience": "entry",
        "limit": 20,
    },
    {
        "keyword": "FIFO Site Administrator",
        "category": "site-administrator",
        "experience": "entry",
        "limit": 20,
    },
    {
        "keyword": "FIFO Underground Nipper Trainee",
        "category": "underground-nipper",
        "experience": "entry",
        "limit": 20,
    },
]

# %%
def seek_url(keyword):
    params = urlencode({
        "keywords": keyword,
        "where": "Western Australia",
    })
    return f"https://www.seek.com.au/jobs?{params}"


def clean(text):
    if not text:
        return "Not listed"
    return re.sub(r"\s+", " ", text).strip()


def detect_roster(text):
    patterns = [
        r"\b2\s*[:/]\s*1\b",
        r"\b2\s*[:/]\s*2\b",
        r"\b8\s*[:/]\s*6\b",
        r"\b7\s*[:/]\s*7\b",
        r"\b4\s*[:/]\s*3\b",
        r"\b5\s*[:/]\s*2\b",
        r"\bFIFO\b",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.I)
        if match:
            return match.group(0).replace(" ", "").upper()

    return "Not listed"


def detect_tickets(text):
    text_lower = text.lower()

    ticket_map = {
        "HR Licence": ["hr licence", "hr license"],
        "MR Licence": ["mr licence", "mr license"],
        "C Class Licence": ["c class", "manual licence", "driver licence", "drivers licence", "driver's licence"],
        "White Card": ["white card"],
        "National Police Check": ["police check", "national police clearance", "npc"],
        "First Aid": ["first aid"],
        "Working at Heights": ["working at heights", "work safely at heights"],
        "Confined Space": ["confined space"],
        "Forklift Licence": ["forklift", "lf licence"],
        "RSA": ["rsa", "responsible service of alcohol"],
        "Food Safety": ["food safety", "food handling"],
    }

    tickets = []

    for ticket, keywords in ticket_map.items():
        if any(keyword in text_lower for keyword in keywords):
            tickets.append(ticket)

    return tickets


def detect_beginner_friendly(text):
    text_lower = text.lower()

    beginner_keywords = [
        "no experience",
        "no mining experience",
        "entry level",
        "trainee",
        "training provided",
        "full training",
        "new to mining",
        "starter",
        "junior",
        "offsider",
        "utility",
        "trade assistant",
    ]

    return any(keyword in text_lower for keyword in beginner_keywords)


def detect_salary(text):
    salary_patterns = [
        r"\$[\d,]+(?:\.\d+)?\s*(?:-\s*\$[\d,]+(?:\.\d+)?)?\s*(?:per hour|hour|p/h|pa|p\.a\.|per year|annum|year)?",
        r"salary\s*[:\-]?\s*\$[\d,]+.*",
    ]

    for pattern in salary_patterns:
        match = re.search(pattern, text, re.I)
        if match:
            return clean(match.group(0))

    return "Not listed"


def js_value(value):
    if isinstance(value, bool):
        return "true" if value else "false"

    if isinstance(value, list):
        return "[" + ", ".join(f'"{item}"' for item in value) + "]"

    return f'"{str(value).replace(chr(34), chr(92) + chr(34))}"'


def to_jobs_js(jobs):
    output = "const jobs = [\n"

    for job in jobs:
        output += "  {\n"
        for key, value in job.items():
            output += f"    {key}: {js_value(value)},\n"
        output += "  },\n"

    output += "];"
    return output

# %%
async def scrape_seek_jobs():
    all_jobs = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            # slow_mo=300,
        )

        page = await browser.new_page()

        for target in SEARCH_TARGETS:
            url = seek_url(target["keyword"])
            print(f"Searching: {target['keyword']}")

            await page.goto(url, wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(8000)

            html = await page.content()
            soup = BeautifulSoup(html, "html.parser")

            links = []

            for a in soup.select('a[data-automation="jobTitle"], a[href*="/job/"]'):
                href = a.get("href")

                if not href:
                    continue

                if "/job/" in href:
                    full_url = urljoin("https://www.seek.com.au", href.split("?")[0])

                    if full_url not in links:
                        links.append(full_url)

                if len(links) >= target["limit"]:
                    break

            print(f"Found {len(links)} jobs")

            for job_url in links:
                job_page = await browser.new_page()
                await job_page.goto(job_url, wait_until="domcontentloaded", timeout=60000)
                await job_page.wait_for_timeout(3000)

                job_html = await job_page.content()
                job_soup = BeautifulSoup(job_html, "html.parser")
                text = clean(job_soup.get_text(" "))

                title_tag = job_soup.select_one('[data-automation="job-detail-title"]')
                company_tag = job_soup.select_one('[data-automation="advertiser-name"]')
                location_tag = job_soup.select_one('[data-automation="job-detail-location"]')

                title = clean(title_tag.get_text()) if title_tag else "Not listed"
                company = clean(company_tag.get_text()) if company_tag else "Not listed"
                location = clean(location_tag.get_text()) if location_tag else "Regional WA"

                job = {
                    "title": title,
                    "company": company,
                    "location": location,
                    "roster": detect_roster(text),
                    "category": target["category"],
                    "experience": target["experience"],
                    "tickets": detect_tickets(text),
                    "applyUrl": job_url,
                    "salary": detect_salary(text),
                    "source": "SEEK",
                    "dateAdded": str(date.today()),
                    "status": "Active",
                    "beginnerFriendly": detect_beginner_friendly(text),
                }

                all_jobs.append(job)
                await job_page.close()

        await browser.close()

    return all_jobs

# %%
if __name__ == "__main__":
    jobs = asyncio.run(scrape_seek_jobs())
    df = pd.DataFrame(jobs)

    df["Tickets"] = df["tickets"].apply(
        lambda x: ", ".join(x) if isinstance(x, list) else ""
    )

    df = df.rename(columns={
        "title": "Title",
        "company": "Company",
        "location": "Location",
        "roster": "Roster",
        "category": "Category",
        "experience": "Experience",
        "beginnerFriendly": "Beginner Friendly",
        "salary": "Salary",
        "source": "Source",
        "dateAdded": "Date Added",
        "status": "Status",
        "applyUrl": "Apply URL"
    })

    df["Visible"] = True
    df["Expiry Date"] = ""
    df["Last Checked"] = ""

    df = df[
        [
            "Title",
            "Company",
            "Location",
            "Roster",
            "Category",
            "Experience",
            "Beginner Friendly",
            "Tickets",
            "Salary",
            "Source",
            "Date Added",
            "Status",
            "Apply URL",
            "Visible",
            "Expiry Date",
            "Last Checked",
        ]
    ]

    df.to_csv("wa_fifo_jobs.csv", index=False)

    print(f"Saved {len(df)} jobs to wa_fifo_jobs.csv")
    # print(to_jobs_js(jobs))
