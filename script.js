function calculateTax(event) {
    event.preventDefault();

    const netIncome = parseFloat(document.getElementById('netIncome').value);
    const filingStatus = document.getElementById('filingStatus').value;
    const tax = incomeTax(netIncome, filingStatus);

    let resultsHTML = `<h4>Tax Calculation:</h4>`;
    resultsHTML += `<p>Net Income: $${netIncome.toFixed(2)}</p>`;
    resultsHTML += `<p>Filing Status: ${filingStatus}</p>`;
    resultsHTML += `<p>Tax: $${tax.toFixed(2)}</p>`;

    document.getElementById('results').innerHTML = resultsHTML;
}

function incomeTax(taxableIncome, status) {
    const taxRates = {
        'Single': {
            'Rates': [10, 12, 22, 24, 32, 35, 37],
            'Ranges': [0, 9700, 39475, 84200, 160725, 204100, 510300],
            'MinTax': [0, 970, 4543, 14382, 32748, 46628, 153798]
        },
        'Married Jointly': {
            'Rates': [10, 12, 22, 24, 32, 35, 37],
            'Ranges': [0, 19400, 78950, 168400, 321450, 408200, 612350],
            'MinTax': [0, 1940, 9086, 28765, 65497, 93257, 164709]
        },
        'Married Separately': {
            'Rates': [10, 12, 22, 24, 32, 35, 37],
            'Ranges': [0, 9700, 39475, 84200, 160725, 204100, 306175],
            'MinTax': [0, 970, 4543, 14382.50, 32748.50, 46628.50, 82354.75]
        },
        'Head of Household': {
            'Rates': [10, 12, 22, 24, 32, 35, 37],
            'Ranges': [0, 13850, 52850, 84200, 160700, 204100, 510300],
            'MinTax': [0, 1385, 6065, 12962, 31322, 45210, 152380]
        }
    };

    const rates = taxRates[status]['Rates'];
    const ranges = taxRates[status]['Ranges'];
    const minTax = taxRates[status]['MinTax'];

    let tax = 0;

    for (let i = 0; i < ranges.length; i++) {
        if (taxableIncome <= ranges[i]) {
            tax = minTax[i] + (taxableIncome - ranges[i - 1]) * (rates[i] / 100);
            break;
        }
    }

    return tax;
}
