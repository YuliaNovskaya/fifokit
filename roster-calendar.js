const rosterCalendar = document.getElementById("rosterCalendar");
let currentDate = new Date();

const waPublicHolidays = {
  "2026-01-01": "New Year's Day",
  "2026-01-26": "Australia Day",
  "2026-03-02": "Labour Day",
  "2026-04-03": "Good Friday",
  "2026-04-06": "Easter Monday",
  "2026-04-25": "ANZAC Day",
  "2026-06-01": "WA Day",
  "2026-09-28": "King's Birthday",
  "2026-12-25": "Christmas Day",
  "2026-12-26": "Boxing Day",

  "2027-01-01": "New Year's Day",
  "2027-01-26": "Australia Day",
  "2027-03-01": "Labour Day",
  "2027-03-26": "Good Friday",
  "2027-03-28": "Easter Sunday",
  "2027-03-29": "Easter Monday",
  "2027-04-25": "ANZAC Day",
  "2027-04-26": "ANZAC Day Holiday",
  "2027-06-07": "WA Day",
  "2027-09-27": "King's Birthday",
  "2027-12-25": "Christmas Day",
  "2027-12-26": "Boxing Day",
  "2027-12-27": "Christmas Day Holiday",
  "2027-12-28": "Boxing Day Holiday",
};

const waSchoolHolidays2026 = [
  {
    start: "2026-01-01",
    end: "2026-01-31",
    label: "Summer Holidays",
  },
  {
    start: "2026-04-03",
    end: "2026-04-19",
    label: "Term 1 Holidays",
  },
  {
    start: "2026-07-04",
    end: "2026-07-19",
    label: "Term 2 Holidays",
  },
  {
    start: "2026-09-26",
    end: "2026-10-11",
    label: "Term 3 Holidays",
  },
  {
    start: "2026-12-19",
    end: "2027-01-31",
    label: "Summer Holidays",
  },
];

function getSchoolHolidayName(dateKey) {
  return waSchoolHolidays2026.find((holiday) => {
    return dateKey >= holiday.start && dateKey <= holiday.end;
  })?.label;
}

const rosterStartDateInput =
  document.getElementById("rosterStartDate");

const savedRosterStartDate =
  localStorage.getItem("fifoRosterStartDate");

const savedRosterType =
  localStorage.getItem("fifoRosterType");

rosterStartDateInput.value =
  savedRosterStartDate || new Date().toISOString().split("T")[0];

if (savedRosterType) {
  document.getElementById("rosterType").value = savedRosterType;
}
  
function renderRosterCalendar() {
    const today = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-AU", {
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
    <span class="legend-item holiday-legend">WA public holidays</span>
    <span class="legend-item school-legend">WA school holidays</span>
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
      ? new Date(rosterStartDateInput + "T00:00:00")
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

    const dateKey =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const publicHolidayName =
      waPublicHolidays[dateKey];

    const isPublicHoliday =
      Boolean(publicHolidayName);

    const schoolHolidayName =
      getSchoolHolidayName(dateKey);

    const isSchoolHoliday =
      Boolean(schoolHolidayName);

    calendarDays.innerHTML += `
      <div class="calendar-day ${isToday ? "today" : ""} ${isWorkDay ? "work-day" : "home-day"} ${isPublicHoliday ? "public-holiday" : ""} ${isSchoolHoliday ? "school-holiday" : ""}">
        <span>${day}</span>
        <small>${isWorkDay ? "Work" : "Home"}</small>
        ${isPublicHoliday ? `<small>${publicHolidayName}</small>` : ""}
        ${isSchoolHoliday ? `<small>${schoolHolidayName}</small>` : ""}
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

const saveRosterButton =
  document.getElementById("saveRoster");

const clearRosterButton =
  document.getElementById("clearRoster");

saveRosterButton.addEventListener("click", () => {
  const rosterStartDate =
    document.getElementById("rosterStartDate").value;

  const rosterType =
    document.getElementById("rosterType").value;

  localStorage.setItem("fifoRosterStartDate", rosterStartDate);
  localStorage.setItem("fifoRosterType", rosterType);

  alert("Roster saved on this device.");
});

clearRosterButton.addEventListener("click", () => {
  localStorage.removeItem("fifoRosterStartDate");
  localStorage.removeItem("fifoRosterType");

  alert("Saved roster cleared.");
});