const rosterCalendar = document.getElementById("rosterCalendar");

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth();

const monthName = today.toLocaleString("en-AU", {
  month: "long",
  year: "numeric",
});

rosterCalendar.innerHTML = `
  <h3>${monthName}</h3>

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

for (let day = 1; day <= totalDays; day++) {
  const rosterType =
    document.getElementById("rosterType").value;

  const [workDays, offDays] =
    rosterType.split("-").map(Number);

  const cycleLength =
    workDays + offDays;

  const dayIndex =
    day - 1;

  const cycleDay =
    dayIndex % cycleLength;

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
