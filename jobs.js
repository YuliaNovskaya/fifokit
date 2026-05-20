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

      <h3>${job.title}</h3>

      <div class="job-meta">
        <span><strong>Company:</strong> ${job.company}</span>
        <span><strong>Location:</strong> ${job.location}</span>
        <span><strong>Roster:</strong> ${job.roster}</span>
        <span><strong>Tickets:</strong> ${job.tickets.join(", ")}</span>
      </div>

      <a href="${job.applyUrl}" target="_blank">
        Apply Now
      </a>
    `;

    jobsList.appendChild(card);

  });
}

renderJobs(jobs);