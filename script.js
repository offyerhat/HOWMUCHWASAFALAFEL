function calculate() {
    var yearInput = document.getElementById("yearInput").value;
    var resultParagraph = document.getElementById("result");

    // Simple calculation logic (replace this with your own logic)
    var result = calculatePrice(yearInput);

    resultParagraph.textContent = "The estimated falafel price for " + yearInput + " is: $" + result.toFixed(2);
}

function calculatePrice(year) {
    // Replace this logic with your own pricing calculation based on the year
    if (year >= 1990) {
        return 5.00;
    } else if (year >= 1980) {
        return 3.50;
    } else {
        return 2.00;
    }
}
