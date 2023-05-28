// ------- logic for choosing random symbol -----------

// temporary list of symbols as an example
const tickerSymbols = ['AAPL', 'GOOG', 'TSLA', 'AMZN', 'MSFT', 'FB'];

// fetch symbols from nasdaq.json - 5k stocks
fetch('../assets/nasdaq.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });

// fetch data from symbol
const apiKey = 'D7JE7YVDE4QHC95D'; // don't lose this
const exchange = 'NASDAQ'; // fetch stocks from NASDAQ exchange

function getRandomStock() {
    const idx = Math.floor(Math.random() * tickerSymbols.length);
    return tickerSymbols[idx];
}

function updateTickerSymbol() {
    const tickerSymbolElement = document.getElementById('tickerSymbol');
    const randomStock = getRandomStock();
    tickerSymbolElement.innerText = randomStock;
}

const pickButton = document.getElementById('pickButton');
pickButton.addEventListener('click', updateTickerSymbol);