const rosterCalendar = document.getElementById("rosterCalendar");
let currentDate = new Date();
const rosterStartDateInput =
  document.getElementById("rosterStartDate");

rosterStartDateInput.value =
  new Date().toISOString().split("T")[0];
  
function renderRosterCalendar() {
    const today = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

  const monthName = today.toLocaleString("en-AU", {
    month: "long",
    year: "numeric",
  });

  rosterCalendar.innerHTML = `
    <div class="calendar-header">
    <button id="prevMonth" class="calendar-nav-btn">
        ←
    </button>

    <h3>${monthName}</h3>

    <button id="nextMonth" class="calendar-nav-btn">
        →
    </button>
    </div>

    <div class="calendar-legend">
    <span class="legend-item work-legend">Work days</span>
    <span class="legend-item home-legend">Home days</span>
    </div>

    <div class="calendar-grid calendar-weekdays">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>

    <div class="calendar-grid" id="calendarDays"></div>
  `;

  const calendarDays =
    document.getElementById("calendarDays");

  const firstDay =
    new Date(year, month, 1);

  const lastDay =
    new Date(year, month + 1, 0);

  const totalDays =
    lastDay.getDate();

  let startingDay =
    firstDay.getDay();

  if (startingDay === 0) {
    startingDay = 7;
  }

  for (let i = 1; i < startingDay; i++) {
    calendarDays.innerHTML += `
      <div class="calendar-day empty"></div>
    `;
  }

  const rosterType =
    document.getElementById("rosterType").value;

  const [workDays, offDays] =
    rosterType.split("-").map(Number);

  const cycleLength =
    workDays + offDays;

  for (let day = 1; day <= totalDays; day++) {
    const rosterStartDateInput =
    document.getElementById("rosterStartDate").value;

    const rosterStartDate =
    rosterStartDateInput
        ? new Date(rosterStartDateInput)
        : new Date(year, month, 1);

    const currentDayDate =
    new Date(year, month, day);

    const dayIndex =
    Math.floor((currentDayDate - rosterStartDate) / (1000 * 60 * 60 * 24));

    const cycleDay =
        ((dayIndex % cycleLength) + cycleLength) % cycleLength;

    const isWorkDay =
      cycleDay < workDays;

    const isToday =
      day === today.getDate();

    calendarDays.innerHTML += `
      <div class="calendar-day ${isToday ? "today" : ""} ${isWorkDay ? "work-day" : "home-day"}">
        <span>${day}</span>
        <small>${isWorkDay ? "Work" : "Home"}</small>
      </div>
    `;
  }
}

renderRosterCalendar();
renderRosterCalendar();

document.getElementById("rosterType").addEventListener("change", () => {
  renderRosterCalendar();
});

document.getElementById("rosterStartDate").addEventListener("change", () => {
  renderRosterCalendar();
});

document.addEventListener("click", (e) => {

  if (e.target.id === "prevMonth") {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderRosterCalendar();
  }

  if (e.target.id === "nextMonth") {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderRosterCalendar();
  }
});