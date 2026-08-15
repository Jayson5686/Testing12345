/* =============================================================================
   1. LOAD CSV DATA
   ============================================================================= 
   Purpose: Fetch CSV data from file and parse it into JavaScript objects
   Process:
   - Fetch data/data.csv from server
   - Split by lines and parse each row as comma-separated values
   - Convert strings to numbers (year, solar, wind, hydro, gas)
   - Call all display functions to render data on page
   - Handle errors with user-friendly message
   ============================================================================= */

fetch("data/data.csv")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Could not load data.csv");
        }
        return response.text();
    })
    .then(function(csv) {
        const rows = csv.trim().split(/\r?\n/);
        const data = [];

        /* Parse CSV rows (skip header row at index 0) */
        for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(",");
            data.push({
                year: Number(values[0]),
                solar: Number(values[1]),
                wind: Number(values[2]),
                hydro: Number(values[3]),
                gas: Number(values[4])
            });
        }

        /* Call all display functions with parsed data */
        displayTable(data);
        displayStatistics(data);
        displaySources(data);
        drawChart(data);
    })
    .catch(function(error) {
        console.error(error);

        /* Display error message in table */
        document.getElementById("energyTable").innerHTML = `
            <tr>
                <td colspan="6">Dataset could not be loaded.</td>
            </tr>
        `;

        /* Display user-friendly error message */
        document.getElementById("errorMessage").textContent =
            "Please make sure the website is running with Live Server and that data/data.csv exists.";
    });

/* =============================================================================
   2. DISPLAY TABLE
   ============================================================================= 
   Purpose: Populate the HTML table with all energy production data rows
   Process:
   - Get reference to table body element
   - Clear existing content
   - Loop through each data row and create table cells
   - Calculate total energy for each year (sum of all sources)
   - Append row to table
   ============================================================================= */

function displayTable(data) {
    const table = document.getElementById("energyTable");
    table.innerHTML = "";

    /* Create table row for each year */
    data.forEach(function(row) {
        const total = row.solar + row.wind + row.hydro + row.gas;
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.year}</td>
            <td>${row.solar}</td>
            <td>${row.wind}</td>
            <td>${row.hydro}</td>
            <td>${row.gas}</td>
            <td><strong>${total}</strong></td>
        `;

        table.appendChild(tr);
    });
}

/* =============================================================================
   3. DISPLAY STATISTICS
   ============================================================================= 
   Purpose: Calculate and display key energy metrics in statistics cards
   Calculates:
   - Total Production: Sum of all energy sources across all years (GWh)
   - Renewable Energy: Sum of solar + wind + hydro across all years (GWh)
   - Solar Production: Total solar energy across all years (GWh)
   - Latest Year: Most recent year in dataset for context
   Features: Numbers formatted with locale string (thousands separator)
   ============================================================================= */

function displayStatistics(data) {
    let total = 0;
    let renewable = 0;
    let solar = 0;

    /* Calculate totals by summing all data rows */
    data.forEach(function(row) {
        total += row.solar + row.wind + row.hydro + row.gas;
        renewable += row.solar + row.wind + row.hydro;
        solar += row.solar;
    });

    const latestYear = data[data.length - 1].year;

    /* Update DOM elements with calculated values */
    document.getElementById("totalProduction").textContent = total.toLocaleString();
    document.getElementById("renewableProduction").textContent = renewable.toLocaleString();
    document.getElementById("solarProduction").textContent = solar.toLocaleString();
    document.getElementById("latestYear").textContent = latestYear;
}

/* =============================================================================
   4. DISPLAY ENERGY SOURCES
   ============================================================================= 
   Purpose: Calculate and display percentage breakdown of energy production
   by source type (Solar, Wind, Hydro, Natural Gas)
   Process:
   - Sum each energy source across all years
   - Calculate total of all sources
   - Calculate percentage for each source
   - Update percentage text and progress bar width
   ============================================================================= */

function displaySources(data) {
    let solar = 0;
    let wind = 0;
    let hydro = 0;
    let gas = 0;

    /* Sum each energy source across all years */
    data.forEach(function(row) {
        solar += row.solar;
        wind += row.wind;
        hydro += row.hydro;
        gas += row.gas;
    });

    const total = solar + wind + hydro + gas;

    /* Update each source with percentage and bar width */
    setSource(solar, total, "solarPercentage", "solarBar");
    setSource(wind, total, "windPercentage", "windBar");
    setSource(hydro, total, "hydroPercentage", "hydroBar");
    setSource(gas, total, "gasPercentage", "gasBar");
}

/* Helper function: Update source percentage and progress bar */
function setSource(value, total, textId, barId) {
    const percentage = (value / total) * 100;

    /* Update percentage text (1 decimal place) */
    document.getElementById(textId).textContent = percentage.toFixed(1) + "%";

    /* Update progress bar width */
    document.getElementById(barId).style.width = percentage + "%";
}

/* =============================================================================
   5. DRAW CHART
   ============================================================================= 
   Purpose: Draw a line chart showing total energy production trends over time
   Features:
   - Uses HTML5 Canvas 2D rendering context
   - Responsive sizing based on container width/height
   - Device pixel ratio scaling for sharp graphics
   - Grid lines for readability
   - Blue line showing production trend
   - Data points marked with white circles
   - Year labels on x-axis
   Chart Elements:
   - Background: Light gray (#f8fafc)
   - Grid lines: Light gray (#e5e7eb)
   - Line: Blue (#2563eb), 3px width
   - Points: White circles with blue stroke
   ============================================================================= */

function drawChart(data) {
    const canvas = document.getElementById("energyChart");
    const ctx = canvas.getContext("2d");

    /* Set canvas size based on container dimensions */
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);

    /* Calculate chart dimensions */
    const padding = 45;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    /* Calculate maximum production value for scale */
    const totals = data.map(function(row) {
        return row.solar + row.wind + row.hydro + row.gas;
    });
    const max = Math.max(...totals);

    /* Draw Background */
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    /* Draw Grid Lines */
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    /* Draw Production Trend Line */
    ctx.beginPath();
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;

    data.forEach(function(row, index) {
        const total = row.solar + row.wind + row.hydro + row.gas;
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (total / max) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    /* Draw Data Points and Year Labels */
    data.forEach(function(row, index) {
        const total = row.solar + row.wind + row.hydro + row.gas;
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (total / max) * chartHeight;

        /* Draw white circle at data point */
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 3;
        ctx.stroke();

        /* Draw year label below x-axis */
        ctx.fillStyle = "#64748b";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(row.year, x, height - 12);
    });
}

/* =============================================================================
   6. REDRAW CHART ON WINDOW RESIZE
   ============================================================================= 
   Purpose: Automatically redraw chart when browser window is resized
   Features:
   - Listens for window 'resize' event
   - Re-fetches CSV data to ensure consistency
   - Re-parses data from CSV
   - Calls drawChart() to redraw canvas at new dimensions
   Note: Fetches data each time to maintain data integrity across resize events
   ============================================================================= */

window.addEventListener("resize", function() {
    fetch("data/data.csv")
        .then(function(response) {
            return response.text();
        })
        .then(function(csv) {
            const rows = csv.trim().split(/\r?\n/);
            const data = [];

            /* Parse CSV data (skip header row) */
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(",");
                data.push({
                    year: Number(values[0]),
                    solar: Number(values[1]),
                    wind: Number(values[2]),
                    hydro: Number(values[3]),
                    gas: Number(values[4])
                });
            }

            /* Redraw chart with updated dimensions */
            drawChart(data);
        });
});
