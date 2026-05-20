const jobs = [
  {
    title: "Utility Worker",
    company: "Compass Group",
    location: "Pilbara, WA",
    roster: "2:1",
    category: "utility",
    experience: "entry",
    tickets: ["Driver Licence", "Police Check"],
    applyUrl: "https://www.seek.com.au/",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
  },

  {
    title: "Trade Assistant",
    company: "Programmed",
    location: "Kalgoorlie, WA",
    roster: "8:6",
    category: "trade-assistant",
    experience: "entry",
    tickets: ["White Card", "Driver Licence"],
    applyUrl: "https://www.seek.com.au/",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
  },

  {
    title: "Driller's Offsider",
    company: "DDH1 Drilling",
    location: "Regional WA",
    roster: "2:1",
    category: "drillers-offsider",
    experience: "entry",
    tickets: ["HR Licence", "National Police Check"],
    applyUrl: "https://www.seek.com.au/",
    salary: "Not listed",
    source: "SEEK",
    dateAdded: "2026-05-20",
    status: "Active",
  }
];

const jobsList = document.getElementById("jobsList");

function renderJobs(jobItems) {

  jobsList.innerHTML = "";

  jobItems.forEach((job) => {

    const card = document.createElement("div");

    card.className = "job-card";

    card.innerHTML = `
      <div class="entry-tag">
        ${job.experience === "entry" ? "Entry Level" : "Experienced"}
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
}

const searchInput = document.getElementById("jobSearch");
const categoryFilter = document.getElementById("jobCategory");
const experienceFilter = document.getElementById("jobExperience");
const rosterFilter = document.getElementById("jobRoster");

function filterJobs() {

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
    job.roster === rosterValue ||
    (rosterValue === "FIFO" && job.roster !== "");

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

renderJobs(jobs);