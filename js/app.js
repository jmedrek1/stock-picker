// ------- logic for choosing random symbol -----------

let tickerSymbols = []; // Temporary list of symbols as an example

function fetchSymbols() {
    return fetch('../assets/nasdaq.json')
        .then(response => response.json())
        .then(data => {
        tickerSymbols = data;
        })
        .catch(error => {
        console.error(error);
        });
}

function getRandomStock() {
    const idx = Math.floor(Math.random() * tickerSymbols.length);
    return tickerSymbols[idx];
}

function updateStockInfo() {
    const stock = getRandomStock();
    updateTickerSymbol(stock);
    updateStockName(stock);
}

function updateTickerSymbol(stock) {
    const tickerSymbolElement = document.getElementById('tickerSymbol');
    tickerSymbolElement.innerText = stock['Symbol'];
}

function updateStockName(stock) {
    const stockNameElement = document.getElementById('stockName');
    stockNameElement.innerText = stock['Security Name'];
}

const pickButton = document.getElementById('pickButton');
pickButton.addEventListener('click', updateStockInfo);

// Fetch the symbols when the page loads
document.addEventListener('DOMContentLoaded', fetchSymbols);
