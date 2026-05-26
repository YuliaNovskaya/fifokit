function calculateAustralianTax(income) {

  if (income <= 18200) {
    return 0;
  }

  if (income <= 45000) {
    return (income - 18200) * 0.16;
  }

  if (income <= 135000) {
    return 4288 + (income - 45000) * 0.30;
  }

  if (income <= 190000) {
    return 31288 + (income - 135000) * 0.37;
  }

  return 51638 + (income - 190000) * 0.45;
}

const form = document.getElementById("wageCalculatorForm");
const results = document.getElementById("calculatorResults");
const pageTitle =
  document.querySelector("title");

const fifoRole = document.getElementById("fifoRole");
const annualSalaryInput =
  document.getElementById("annualSalary");

fifoRole.addEventListener("change", () => {
  annualSalaryInput.value = fifoRole.value;
  form.dispatchEvent(new Event("submit"));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const annualSalary =
    Number(document.getElementById("annualSalary").value) || 0;

  const rosterType =
    document.getElementById("rosterType").value;

  const hoursPerShift =
    Number(document.getElementById("hoursPerShift").value) || 0;

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
  calculateAustralianTax(annualSalary);

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

  const timeAwayPercentage =
    ((daysAwayPerYear / 365) * 100).toFixed(1);

    let rosterMessage = "";

    if (timeAwayPercentage > 55) {
    rosterMessage =
        "High-income roster with significant time away from home.";
    } else if (timeAwayPercentage > 45) {
    rosterMessage =
        "Balanced roster with strong earning potential.";
    } else {
    rosterMessage =
        "Lifestyle-focused roster with more time at home.";
    }

  pageTitle.textContent =
  `FIFO Wage Calculator - ${fifoRole.options[fifoRole.selectedIndex].text}`;

  results.innerHTML = `
    <h3>Your FIFO estimate</h3>

    <div class="result-card">
      <strong>Estimated gross annual income:</strong><strong>Gross annual income:</strong>
      <p>$${annualSalary.toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Estimated tax:</strong>
      <p>$${Math.round(estimatedTax).toLocaleString()}</p>
    </div>

    <div class="result-card">
      <strong>Estimated annual take-home pay:</strong>
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

    <div class="result-card">
        <strong>Time away from home:</strong>
        <p>${timeAwayPercentage}% of the year</p>
    </div>

    <div class="result-card">
        <strong>Roster insight:</strong>
        <p>${rosterMessage}</p>
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
const calculatorInputs = form.querySelectorAll("input, select");

calculatorInputs.forEach((input) => {
  input.addEventListener("input", () => {
    form.dispatchEvent(new Event("submit"));
  });

  input.addEventListener("change", () => {
    form.dispatchEvent(new Event("submit"));
  });
});
form.dispatchEvent(new Event("submit"));