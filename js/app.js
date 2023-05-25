// logic for choosing random symbol

// temporary list of symbols as an example
const tickerSymbols = ['AAPL', 'GOOG', 'TSLA', 'AMZN', 'MSFT', 'FB'];

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