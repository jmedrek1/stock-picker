// logic for choosing random symbol

// temporary list of symbols as an example
const tickerSymbols = ['AAPL', 'GOOG', 'TSLA', 'AMZN', 'MSFT', 'FB'];

// fetch symbols
const apiKey = 'D7JE7YVDE4QHC95D'; // don't lose this
const exchange = 'NASDAQ'; // fetch stocks from NASDAQ exchange

fetch(`https://www.alphavantage.co/query?function=LISTING_STATUS&exchange=${exchange}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });

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