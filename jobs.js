const jobs = [
  {
    title: "FIFO Cleaner/Utilities - 2:1 [MANUAL C Class Licence Required]",
    company: "Red Arrow Australia",
    location: "Perth WA",
    roster: "2:1",
    category: "utility-worker",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92203302",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Utility",
    company: "AROHA SERVICES",
    location: "Perth WA",
    roster: "2:1",
    category: "utility-worker",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check", "RSA", "Food Safety"],
    applyUrl: "https://www.seek.com.au/job/92091655",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Expressions of Interest - FIFO Utility - Service Attendant",
    company: "Sodexo",
    location: "Perth WA",
    roster: "FIFO",
    category: "utility-worker",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check", "Food Safety"],
    applyUrl: "https://www.seek.com.au/job/91899829",
    salary: "$85,000",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Utility - First Nations Opportunities",
    company: "Civeo",
    location: "Perth WA",
    roster: "2:1",
    category: "utility-worker",
    experience: "entry",
    tickets: ["RSA"],
    applyUrl: "https://www.seek.com.au/job/92128160",
    salary: "$87527.33",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Utility - Fulltime 2:1 Swings",
    company: "IronMerge Pty Ltd",
    location: "Perth WA (Remote)",
    roster: "2:1",
    category: "utility-worker",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check", "Forklift Licence", "RSA", "Food Safety"],
    applyUrl: "https://www.seek.com.au/job/91839886",
    salary: "$87500",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Shutdown Crew - Esperance",
    company: "CPC Labour Hire Pty Ltd",
    location: "Esperance, Kalgoorlie, Goldfields & Esperance WA",
    roster: "FIFO",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["Working at Heights", "Confined Space"],
    applyUrl: "https://www.seek.com.au/job/92160731",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Opportunity - HVAC Trade Assistant",
    company: "Practical Maintenance Services",
    location: "Gnangara, Perth WA",
    roster: "2:1",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["C Class Licence", "White Card", "National Police Check", "Confined Space"],
    applyUrl: "https://www.seek.com.au/job/91962665",
    salary: "$34",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Casual Trades Assistant / General Labourer | FIFO | IMMEDIATE START",
    company: "Alpha National Group",
    location: "Perth WA",
    roster: "2:1",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["C Class Licence", "White Card", "National Police Check", "Forklift Licence"],
    applyUrl: "https://www.seek.com.au/job/91883541",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Trades Assistants - Full-Time Casuals",
    company: "RCR Mining Technologies",
    location: "Welshpool, Perth WA",
    roster: "2:1",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["C Class Licence", "Forklift Licence"],
    applyUrl: "https://www.seek.com.au/job/92225842",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Industrial Painter/Trade Assistant",
    company: "Alltype Engineering Pty. Ltd.",
    location: "Perth WA",
    roster: "2:1",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["C Class Licence", "Working at Heights"],
    applyUrl: "https://www.seek.com.au/job/92192964",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Drillers Offsider – Entry Level & Experienced",
    company: "Strike Drilling",
    location: "Perth WA",
    roster: "Not listed",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["HR Licence", "C Class Licence", "National Police Check", "First Aid"],
    applyUrl: "https://www.seek.com.au/job/92199577",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Driller's Offsiders WA",
    company: "DDH1 Drilling Pty Ltd",
    location: "Perth WA",
    roster: "2:1",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["National Police Check", "First Aid"],
    applyUrl: "https://www.seek.com.au/job/92173350",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Drillers Offsider – Entry Level & Experienced",
    company: "Wallis Drilling Pty Ltd",
    location: "Hazelmere, Perth WA",
    roster: "2/1",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92192516",
    salary: "$120",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Driller Offsider FIFO",
    company: "Nexgen Drilling Pty Ltd",
    location: "Karratha, Port Hedland, Karratha & Pilbara WA",
    roster: "2:1",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["HR Licence", "C Class Licence", "National Police Check", "First Aid"],
    applyUrl: "https://www.seek.com.au/job/92218593",
    salary: "$38",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Underground Offsiders - Entry Level, no experience required!",
    company: "Webdrill Australia Pty Ltd",
    location: "Kalgoorlie, Kalgoorlie, Goldfields & Esperance WA",
    roster: "2:1",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check", "First Aid"],
    applyUrl: "https://www.seek.com.au/job/92214473",
    salary: "$110,000 per year",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Site Administrators",
    company: "Unite Resourcing",
    location: "Perth WA (Remote)",
    roster: "2:1",
    category: "site-administrator",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92224389",
    salary: "$41.00",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Site Administrator",
    company: "Primero Group",
    location: "Eneabba, Geraldton, Gascoyne & Midwest WA",
    roster: "2:1",
    category: "site-administrator",
    experience: "entry",
    tickets: [],
    applyUrl: "https://www.seek.com.au/job/92163664",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: false,
  },
  {
    title: "Site Administrator",
    company: "Northern Star Resources Limited",
    location: "Perth WA",
    roster: "8:6",
    category: "site-administrator",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92172274",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: false,
  },
  {
    title: "FIFO Casual Site Administrators",
    company: "Compass Group",
    location: "Perth WA (Remote)",
    roster: "2:1",
    category: "site-administrator",
    experience: "entry",
    tickets: ["White Card"],
    applyUrl: "https://www.seek.com.au/job/92002051",
    salary: "$452",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Site Administrator - Karara",
    company: "Bis Industries",
    location: "Perth WA",
    roster: "8/6",
    category: "site-administrator",
    experience: "entry",
    tickets: ["National Police Check"],
    applyUrl: "https://www.seek.com.au/job/91990331",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: false,
  },
  {
    title: "Entry Level Drillers Offsider - FIFO | Surface & Underground | $120k+",
    company: "Niche Resources Group",
    location: "Perth WA",
    roster: "2/1",
    category: "underground-nipper",
    experience: "entry",
    tickets: ["HR Licence", "C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92112562",
    salary: "$120",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Entry Level Drillers Offsider - FIFO | Surface & Underground | $120k+",
    company: "Niche Resources Group",
    location: "Perth WA",
    roster: "2/1",
    category: "underground-nipper",
    experience: "entry",
    tickets: ["HR Licence", "C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/91837678",
    salary: "$120",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Entry Level Underground Mining",
    company: "Barminco Pty Ltd",
    location: "Perth WA",
    roster: "2:1",
    category: "underground-nipper",
    experience: "entry",
    tickets: ["C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/92052716",
    salary: "$120",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "Entry Level Drillers Offsider - FIFO | Surface & Underground | $120k+",
    company: "Niche Resources Group",
    location: "Perth WA",
    roster: "2/1",
    category: "underground-nipper",
    experience: "entry",
    tickets: ["HR Licence", "C Class Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/job/91969936",
    salary: "$120",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
  {
    title: "FIFO Mining Intake Now Open – Earn $110K+ in Year One",
    company: "Aston Advantage",
    location: "Perth WA",
    roster: "2:1",
    category: "underground-nipper",
    experience: "entry",
    tickets: ["C Class Licence"],
    applyUrl: "https://www.seek.com.au/job/92087171",
    salary: "$110",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
    beginnerFriendly: true,
  },
];

const jobsList = document.getElementById("jobsList");
const loadMoreButton = document.getElementById("loadMoreJobs");

let visibleJobsCount = 6;
let currentFilteredJobs = jobs;

function renderJobs(jobItems) {

  jobsList.innerHTML = "";

  currentFilteredJobs = jobItems;

  const visibleJobs = jobItems.slice(0, visibleJobsCount);

  visibleJobs.forEach((job) => {

    const today = new Date();

    const addedDate = new Date(job.dateAdded + "T00:00:00");

    const daysSinceAdded =
      (today - addedDate) / (1000 * 60 * 60 * 24);

    const isNewJob = daysSinceAdded <= 7;

    const card = document.createElement("div");

    card.className = "job-card";

    card.innerHTML = `
      <div class="job-tags-row">
        <span class="entry-tag">
          ${job.beginnerFriendly ? "Beginner Friendly" : "Experienced"}
        </span>

        ${isNewJob ? `<span class="new-job-tag">NEW</span>` : ""}
      </div>

      <div class="job-top-row">
        <span class="job-category-badge">
            ${job.category.replace("-", " ")}
        </span>
      </div>

      <h3>${job.title}</h3>

      <div class="job-meta">
        <span><strong>Company:</strong> ${job.company}</span>
        <span><strong>Location:</strong> ${job.location}</span>
        <span><strong>Roster:</strong> ${job.roster}</span>
        <span><strong>Tickets:</strong> ${job.tickets.join(", ")}</span>
        <span><strong>Salary:</strong> ${job.salary}</span>
        <span><strong>Source:</strong> ${job.source}</span>
        <span><strong>Added:</strong> ${job.dateAdded}</span>
      </div>

      <a href="${job.applyUrl}" target="_blank">
        Apply Now
      </a>
    `;

    jobsList.appendChild(card);

  });
  loadMoreButton.style.display =
  visibleJobsCount >= jobItems.length ? "none" : "inline-block";
}

const searchInput = document.getElementById("jobSearch");
const categoryFilter = document.getElementById("jobCategory");
const experienceFilter = document.getElementById("jobExperience");
const rosterFilter = document.getElementById("jobRoster");

function filterJobs() {

  visibleJobsCount = 6;

  const searchValue = searchInput.value.toLowerCase();

  const categoryValue = categoryFilter.value;

  const experienceValue = experienceFilter.value;
  const rosterValue = rosterFilter.value;

  const filtered = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" ||
      job.category === categoryValue;

    const matchesExperience =
      experienceValue === "all" ||
      job.experience === experienceValue;

    const matchesRoster =
      rosterValue === "all" ||
      job.roster === rosterValue;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesExperience &&
      matchesRoster   
    );

  });

  renderJobs(filtered);
}

searchInput.addEventListener("input", filterJobs);

categoryFilter.addEventListener("change", filterJobs);

experienceFilter.addEventListener("change", filterJobs);
rosterFilter.addEventListener("change", filterJobs);
loadMoreButton.addEventListener("click", () => {
  visibleJobsCount += 6;
  renderJobs(currentFilteredJobs);
});

renderJobs(jobs);