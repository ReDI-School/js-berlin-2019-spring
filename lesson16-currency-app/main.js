let fromSelectElement = document.getElementById("from");
let toSelectElement = document.getElementById("to");
let resultElement = document.getElementById("result");

async function putCurrenciesInSelectElements() {
    let response = await fetch("https://api.exchangeratesapi.io/latest")
    let json = await response.json();

    // go through each currency key in the json.rates object
    // using a "for in" loop, which let's us loop over all the
    // keys in an object.
    for (let currency in json.rates) {
        // create an option for the currency in the loop and add
        // to the from select
        let fromSelectionOption = document.createElement("option");
        fromSelectionOption.textContent = currency;
        fromSelectElement.appendChild(fromSelectionOption);

        // create an option for the currency in the loop and add
        // to the to select
        let toSelectOption = document.createElement("option");
        toSelectOption.textContent = currency;
        toSelectElement.appendChild(toSelectOption);
    }
}

// make the initial call to put the currencies in the select elements right away
putCurrenciesInSelectElements();

async function calculate() {
    let fromCurrency = fromSelectElement.value;
    let toCurrency = toSelectElement.value;
    let amountElement = document.getElementById("amount");

    // we will use the fromCurrency as the base currency by appending it to the URL string
    let apiUrl = "https://api.exchangeratesapi.io/latest?base=" + fromCurrency;

    let response = await fetch(apiUrl);
    let json = await response.json();

    // we use the [] notation to use a variable to access the property on the
    // object depending on the value of the variable
    // We only know the "rates" key exists on the josn object because we first
    // checked the API with a console.log(json)
    let rate = json.rates[toCurrency];

    // we will take the amount element value and pass it to a Number() function
    // to make sure that it is a number before we multiply it to the rate that
    // we got from the API.
    let result = rate * Number(amountElement.value);


    // because the result is a "Number" we can use ".toFixed"
    // and we can use the .toFixed() and pass in the number of decimals
    // we want to round to.
    let roundedResult = result.toFixed(2);

    resultElement.textContent = amountElement.value + " " + fromCurrency + " is " + roundedResult + " " + toCurrency;
}
