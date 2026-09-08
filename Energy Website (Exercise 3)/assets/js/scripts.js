// FAQ accordion - show/hide answers when a question is clicked
document.addEventListener("DOMContentLoaded", function () {
    setupFaq();
    setupStoryboard();
    setupCalculator();
});

function setupFaq() {
    var questions = document.querySelectorAll(".faq-question");

    for (var i = 0; i < questions.length; i++) {
        questions[i].addEventListener("click", function () {
            var item = this.parentElement;
            var wasOpen = item.classList.contains("open");

            // close all
            var allItems = document.querySelectorAll(".faq-item");
            for (var j = 0; j < allItems.length; j++) {
                allItems[j].classList.remove("open");
            }

            // reopen only if it was closed
            if (!wasOpen) {
                item.classList.add("open");
            }
        });
    }
}

// storyboard accordion - same one-open-at-a-time pattern as FAQ
function setupStoryboard() {
    var frames = document.querySelectorAll(".story-frame");

    for (var i = 0; i < frames.length; i++) {
        frames[i].addEventListener("click", function () {
            var item = this.parentElement;
            var wasOpen = item.classList.contains("open");

            var allItems = document.querySelectorAll(".story-item");
            for (var j = 0; j < allItems.length; j++) {
                allItems[j].classList.remove("open");
            }

            if (!wasOpen) {
                item.classList.add("open");
            }
        });
    }
}

// calculator: read form, check values, then update the results panel
function setupCalculator() {
    var form = document.getElementById("energy-form");
    if (!form) {
        return;
    }

    var appliance = document.getElementById("appliance");
    var wattsInput = document.getElementById("watts");

    appliance.addEventListener("change", function () {
        if (appliance.value === "custom") {
            wattsInput.value = "";
            wattsInput.readOnly = false;
            wattsInput.focus();
        } else {
            wattsInput.value = appliance.value;
            wattsInput.readOnly = true;
        }
        tryCalculate(false);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        tryCalculate(true);
    });

    form.addEventListener("input", function () {
        tryCalculate(false);
    });
}

function tryCalculate(showEmptyErrors) {
    var watts = document.getElementById("watts").value.trim();
    var hours = document.getElementById("hours").value.trim();
    var price = document.getElementById("price").value.trim();

    var wattsError = checkWatts(watts);
    var hoursError = checkHours(hours);
    var priceError = checkPrice(price);

    showError("watts-error", wattsError);
    showError("hours-error", hoursError);
    showError("price-error", priceError);

    if (!showEmptyErrors && (watts === "" || hours === "" || price === "")) {
        return;
    }

    if (wattsError || hoursError || priceError) {
        showResultError("Please fix the highlighted fields before viewing results.");
        return;
    }

    var result = calculateEnergy(Number(watts), Number(hours), Number(price));
    showResults(result);
}

function checkWatts(value) {
    if (value === "") {
        return "Enter the power in watts.";
    }
    var n = Number(value);
    if (isNaN(n) || n <= 0) {
        return "Watts must be a number greater than 0.";
    }
    return "";
}

function checkHours(value) {
    if (value === "") {
        return "Enter hours used each day.";
    }
    var n = Number(value);
    if (isNaN(n) || n < 0 || n > 24) {
        return "Hours must be between 0 and 24.";
    }
    return "";
}

function checkPrice(value) {
    if (value === "") {
        return "Enter the price in cents per kWh.";
    }
    var n = Number(value);
    if (isNaN(n) || n < 0) {
        return "Price cannot be negative.";
    }
    return "";
}

function calculateEnergy(watts, hours, centsPerKwh) {
    var dailyKwh = (watts * hours) / 1000;
    var monthlyKwh = dailyKwh * 30;
    var yearlyKwh = dailyKwh * 365;
    var dollarsPerKwh = centsPerKwh / 100;

    return {
        dailyKwh: dailyKwh,
        monthlyKwh: monthlyKwh,
        yearlyKwh: yearlyKwh,
        monthlyCost: monthlyKwh * dollarsPerKwh,
        yearlyCost: yearlyKwh * dollarsPerKwh
    };
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function showResultError(message) {
    var box = document.getElementById("results");
    var list = document.getElementById("results-list");
    box.classList.add("has-error");
    document.getElementById("results-message").textContent = message;
    list.innerHTML = "";
}

function showResults(result) {
    var box = document.getElementById("results");
    var list = document.getElementById("results-list");
    box.classList.remove("has-error");
    document.getElementById("results-message").textContent = "Estimates use 30 days for a month and 365 days for a year.";

    // replace previous rows so numbers are not duplicated
    list.innerHTML = "";
    addResultRow(list, "Daily energy", formatKwh(result.dailyKwh));
    addResultRow(list, "Monthly energy", formatKwh(result.monthlyKwh));
    addResultRow(list, "Yearly energy", formatKwh(result.yearlyKwh));
    addResultRow(list, "Estimated monthly cost", formatMoney(result.monthlyCost));
    addResultRow(list, "Estimated yearly cost", formatMoney(result.yearlyCost));
}

function addResultRow(list, label, value) {
    var row = document.createElement("div");
    row.className = "results-item";

    var name = document.createElement("span");
    name.textContent = label;

    var amount = document.createElement("strong");
    amount.textContent = value;

    row.appendChild(name);
    row.appendChild(amount);
    list.appendChild(row);
}

function formatKwh(n) {
    return n.toFixed(2) + " kWh";
}

function formatMoney(n) {
    return "$" + n.toFixed(2);
}
