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