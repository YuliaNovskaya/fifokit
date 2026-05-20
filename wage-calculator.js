const form = document.getElementById("wageCalculatorForm");
const results = document.getElementById("calculatorResults");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const annualSalary =
    Number(document.getElementById("annualSalary").value) || 0;

  const rosterType =
    document.getElementById("rosterType").value;

  const hoursPerShift =
    Number(document.getElementById("hoursPerShift").value) || 0;

  const taxRate =
    Number(document.getElementById("taxRate").value) || 0;

  const homeExpenses =
    Number(document.getElementById("homeExpenses").value) || 0;

  const awayExpenses =
    Number(document.getElementById("awayExpenses").value) || 0;

  const [workDays, offDays] =
    rosterType.split("-").map(Number);

  const cycleDays = workDays + offDays;

  const cyclesPerYear = 365 / cycleDays;

  const daysAwayPerYear = Math.round(workDays * cyclesPerYear);

  const daysHomePerYear = Math.round(offDays * cyclesPerYear);

  const estimatedTax =
    annualSalary * (taxRate / 100);

  const netIncome =
    annualSalary - estimatedTax;

  const yearlyExpenses =
    (homeExpenses + awayExpenses) * 52;

  const yearlySavings =
    netIncome - yearlyExpenses;

  const monthlySavings =
    yearlySavings / 12;

  const totalHoursWorked =
    daysAwayPerYear * hoursPerShift;

  const realHourlyRate =
    netIncome / totalHoursWorked;

  results.innerHTML = `
    <h3>Your FIFO estimate</h3>

    <div class="result-card">
      <strong>Gross annual income:</strong>
      <p>$${annualSalary.toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Estimated net income:</strong>
      <p>$${Math.round(netIncome).toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Days away per year:</strong>
      <p>${daysAwayPerYear}</p>
    </div>

    <div class="result-card">
      <strong>Days home per year:</strong>
      <p>${daysHomePerYear}</p>
    </div>

    <div class="result-card">
      <strong>Estimated yearly savings:</strong>
      <p>$${Math.round(yearlySavings).toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Estimated monthly savings:</strong>
      <p>$${Math.round(monthlySavings).toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Real hourly rate:</strong>
      <p>$${realHourlyRate.toFixed(2)}</p>
    </div>

    <div class="calculator-cta">
      <p>
        Want the full FIFO entry roadmap?
      </p>

      <a href="#buy" class="primary-btn">
        Download the FIFOKIT Starter Pack
      </a>
    </div>
  `;
});