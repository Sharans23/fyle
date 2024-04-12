document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("tax-form");
  const grossIncomeInput = document.getElementById("gross-income");
  const extraIncomeInput = document.getElementById("extra-income");
  const deductionsInput = document.getElementById("deductions");
  const ageSelect = document.getElementById("age");
  const errorIcons = document.querySelectorAll(".error-icon");
  const errorTooltips = document.querySelectorAll(".error-tooltip");
  const calculatedTaxElement = document.getElementById("calculated-tax");
  const taxModal = document.getElementById("tax-modal");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    // Check for input errors
    if (!isValidNumber(grossIncomeInput.value)) {
      showError(grossIncomeInput);
      isValid = false;
    } else {
      hideError(grossIncomeInput);
    }

    if (!isValidNumber(extraIncomeInput.value)) {
      showError(extraIncomeInput);
      isValid = false;
    } else {
      hideError(extraIncomeInput);
    }

    if (!isValidNumber(deductionsInput.value)) {
      showError(deductionsInput);
      isValid = false;
    } else {
      hideError(deductionsInput);
    }

    if (ageSelect.value === "") {
      showError(ageSelect);
      isValid = false;
    } else {
      hideError(ageSelect);
    }

    if (isValid) {
      const grossIncome = parseFloat(grossIncomeInput.value);
      const extraIncome = parseFloat(extraIncomeInput.value);
      const deductions = parseFloat(deductionsInput.value);
      const age = ageSelect.value;

      const totalIncome = grossIncome + extraIncome - deductions;
      let calculatedTax = 0;

      if (totalIncome <= 800000) {
        calculatedTax = 0;
      } else {
        const taxableIncome = totalIncome - 800000;
        switch (age) {
          case "under-40":
            calculatedTax = taxableIncome * 0.3;
            break;
          case "40-60":
            calculatedTax = taxableIncome * 0.4;
            break;
          case "60-plus":
            calculatedTax = taxableIncome * 0.1;
            break;
        }
      }

      calculatedTaxElement.textContent = calculatedTax.toFixed(2);
      $(taxModal).modal("show");
    }
  });

  function isValidNumber(value) {
    return !isNaN(value) && value.trim() !== "";
  }

  function showError(element) {
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }

  function hideError(element) {
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  }
});
