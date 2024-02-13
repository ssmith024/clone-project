function calculateTax(event) {
    event.preventDefault();

    const netIncome = parseFloat(document.getElementById('netIncome').value);
    const singleTax = incomeTax(netIncome, 'Single');
    const marriedJointlyTax = incomeTax(netIncome, 'Married_Jointly');
    const marriedSeparatelyTax = incomeTax(netIncome, 'Married_Separately');
    const headHouseholdTax = incomeTax(netIncome, 'Head_Household');

    let resultsHTML = `<h4>Results:</h4>`;
    resultsHTML += `<p>Net Income: $${netIncome.toFixed(2)}</p>`;
    resultsHTML += `<table class='table'>`;
    resultsHTML += `<thead><tr><th>Status</th><th>Tax</th></tr></thead>`;
    resultsHTML += `<tbody>`;
    resultsHTML += `<tr><td>Single</td><td>$${singleTax.toFixed(2)}</td></tr>`;
    resultsHTML += `<tr><td>Married Filing Jointly</td><td>$${marriedJointlyTax.toFixed(2)}</td></tr>`;
    resultsHTML += `<tr><td>Married Filing Separately</td><td>$${marriedSeparatelyTax.toFixed(2)}</td></tr>`;
    resultsHTML += `<tr><td>Head of Household</td><td>$${headHouseholdTax.toFixed(2)}</td></tr>`;
    resultsHTML += `</tbody></table>`;

    document.getElementById('results').innerHTML = resultsHTML;
}

function incomeTax(taxableIncome, status) {
    // Tax calculation logic
    let tax = 0;

    // Tax rates and brackets for each filing status
    const taxRates = {
        'Single': [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
        'Married_Jointly': [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
        'Married_Separately': [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
        'Head_Household': [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
    };

    const taxBrackets = {
        'Single': [0, 9700, 39475, 84200, 160725, 204100, 510300],
        'Married_Jointly': [0, 19400, 78950, 168400, 321450, 408200, 612350],
        'Married_Separately': [0, 9700, 39475, 84200, 160725, 204100, 306175],
        'Head_Household': [0, 13850, 52850, 84200, 160700, 204100, 510300]
    };

    const minTax = {
        'Single': [0, 970, 4543, 14382, 32748, 46628, 153798],
        'Married_Jointly': [0, 1940, 9086, 28765, 65497, 93257, 164709],
        'Married_Separately': [0, 970, 4543, 14382.5, 32748.5, 46628.5, 82354.75],
        'Head_Household': [0, 1385, 6065, 12962, 31322, 45210, 152380]
    };

    // Find the appropriate tax bracket for the given income
    let i = 0;
    while (i < taxBrackets[status].length && taxableIncome > taxBrackets[status][i]) {
        i++;
    }

    // Calculate tax based on the tax bracket
    if (i > 0) {
        tax = minTax[status][i] + (taxableIncome - taxBrackets[status][i - 1]) * taxRates[status][i];
    }

    return tax;
}
