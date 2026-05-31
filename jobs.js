const jobsList = document.getElementById("jobsList");
const loadMoreButton = document.getElementById("loadMoreJobs");
const jobCount = document.getElementById("jobCount");
const lastUpdated = document.getElementById("lastUpdated");

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

function updateRoleCounts() {

  const counts = {};

  jobs.forEach((job) => {
    counts[job.category] = (counts[job.category] || 0) + 1;
  });

  document.querySelectorAll("[data-role-card]").forEach((card) => {

    const category = card.dataset.roleCard;

    const count = counts[category] || 0;

    const countElement = card.querySelector(".role-job-count");

    const filterLink = card.querySelector(".role-filter-link");

    if (countElement) {
      countElement.textContent =
        count === 1 ? "1 active job" : `${count} active jobs`;
    }

    if (filterLink) {
      filterLink.textContent =
        count === 1 ? "1 active job" : `${count} active jobs`;
    }

  });
}

const jobsSignupForm = document.getElementById("jobsSignupForm");
const jobsSignupEmail = document.getElementById("jobsSignupEmail");
const jobsSignupMessage = document.getElementById("jobsSignupMessage");

const jobsSignupWebhookUrl = "https://hook.us2.make.com/4lo8fwn3e1x9ct7tkv6zt7ytdphcr8ha";

if (jobsSignupForm) {
  jobsSignupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    jobsSignupMessage.textContent = "Submitting...";

    try {
      const response = await fetch(jobsSignupWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: jobsSignupEmail.value,
          source: "jobs-page",
          categoryInterest: categoryFilter.value || "all"
        })
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      jobsSignupMessage.textContent = "Done. You are on the FIFO jobs update list.";
      jobsSignupForm.reset();

    } catch (error) {
      jobsSignupMessage.textContent = "Something went wrong. Please try again.";
    }
  });
}

searchInput.addEventListener("input", filterJobs);

categoryFilter.addEventListener("change", filterJobs);

experienceFilter.addEventListener("change", filterJobs);
rosterFilter.addEventListener("change", filterJobs);
loadMoreButton.addEventListener("click", () => {
  visibleJobsCount += 6;
  renderJobs(currentFilteredJobs);
});

document.querySelectorAll("[data-category-filter]").forEach((link) => {

  link.addEventListener("click", (event) => {

    event.preventDefault();

    const category = link.dataset.categoryFilter;

    categoryFilter.value = category;

    visibleJobsCount = 6;

    filterJobs();

    document.getElementById("jobsList").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});

if (jobCount) {
  jobCount.textContent = ` ${jobs.length} active jobs listed.`;
}
if (lastUpdated && jobs.length > 0) {

  const latestDate = jobs
    .map(job => new Date(job.dateAdded))
    .sort((a, b) => b - a)[0];

  lastUpdated.textContent =
    latestDate.toLocaleDateString("en-AU");
}

function applyCategoryFromUrl() {

  const params = new URLSearchParams(window.location.search);

  const category = params.get("category");

  if (!category) {
    return;
  }

  if (categoryFilter) {
    categoryFilter.value = category;
    filterJobs();
  }
}

applyCategoryFromUrl();

updateRoleCounts();
applyCategoryFromUrl();

if (!new URLSearchParams(window.location.search).get("category")) {
  renderJobs(jobs);
}