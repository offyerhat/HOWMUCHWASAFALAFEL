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
        2009: 3.00,
        2006: 2.25,
        2001: 2.00,
        1998: 1.50,
        1997: 1.00,
        1996: 1.00,
        1995: 1.00,
        1994: 1.00,
        1993: 1.00,
        1992: 1.00,
        1991: 1.00,
        1990: 1.00,
        1989: 1.00,
        1988: 0.75,
        1987: 0.75,
        1986: 0.75,
        1985: 0.75,
        1984: 0.75,
        1983: 0.75,
        1982: 0.75,
        1981: 0.75,
        1980: 0.75,
        1979: 0.75,
        // Add responses for years before 1979
        1978: "Falafels probably existed then (probably), but Mamoun's didn't",
        1977: "Falafels probably existed then (probably), but Mamoun's didn't",
        1976: "Falafels probably existed then (probably), but Mamoun's didn't",
        // ... (continue for any years before 1976)
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

