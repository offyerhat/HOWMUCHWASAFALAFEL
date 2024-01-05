function calculatePrice(year) {
    // Define the pricing table
    const pricingTable = {
        2020: 6.00,
        2019: 5.00,
        2018: 4.75,
        2017: 4.50,
        2016: 4.00,
        2015: { beforeApril: 3.00, afterApril: 3.50 },
        2014: 3.50,
        2013: 3.50,
        2012: 3.00,
        2011: 2.50,
        1971: 0.75,
    };

    // Check if the year is in the pricing table
    if (pricingTable.hasOwnProperty(year)) {
        return pricingTable[year];
    }

    // For years not listed, apply the average rate of increase per year
    const averageRateOfIncrease = calculateAverageRateOfIncrease(pricingTable);
    const baseYear = Math.max(...Object.keys(pricingTable)); // Find the latest year in the table

    return calculateAdjustedPrice(year, baseYear, averageRateOfIncrease);
}

function calculateAverageRateOfIncrease(pricingTable) {
    const years = Object.keys(pricingTable);
    const prices = years.map(year => {
        if (typeof pricingTable[year] === 'number') {
            return pricingTable[year];
        } else {
            // If the entry is an object, use the average of beforeApril and afterApril
            return (pricingTable[year].beforeApril + pricingTable[year].afterApril) / 2;
        }
    });

    // Calculate the average rate of increase
    const totalIncrease = prices.reduce((sum, price, index) => {
        if (index > 0) {
            return sum + (price - prices[index - 1]);
        }
        return sum;
    }, 0);

    return totalIncrease / (prices.length - 1);
}

function calculateAdjustedPrice(year, baseYear, averageRateOfIncrease) {
    const yearsSinceBaseYear = baseYear - year;
    const adjustedPrice = pricingTable[baseYear] + yearsSinceBaseYear * averageRateOfIncrease;
    return Math.max(adjustedPrice, 0); // Ensure the price is non-negative
}

