// Alpha Vantage key: D7JE7YVDE4QHC95D
// ------- logic for choosing random symbol -----------

let tickerSymbols = []; // Temporary list of symbols as an example

function fetchSymbols() {
    return fetch('assets/nasdaq.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
    fetchSymbols().then(() => {
        const stock = getRandomStock();
        updateTickerSymbol(stock);
        updateStockName(stock);
        updatePriceChart(stock);
    });
}

function updateTickerSymbol(stock) {
    const tickerSymbolElement = document.getElementById('tickerSymbol');
    tickerSymbolElement.innerText = stock['Symbol'];
}

function updateStockName(stock) {
    const stockNameElement = document.getElementById('stockName');
    stockNameElement.innerText = stock['Security Name'];
}

const priceChartElement = document.getElementById('priceChart');
let priceChart = null;

function updatePriceChart(stock) {
    const apiKey = 'D7JE7YVDE4QHC95D';
    const symbol = stock['Symbol'];
    const interval = '60min';

    // get price data from AlphaVantage
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const timeSeriesData = data[`Time Series (${interval})`];

            const dates = Object.keys(timeSeriesData).reverse();
            const closingPrices = dates.map(data => parseFloat(timeSeriesData[data]['4. close']));
            
            // set color based on price change
            const firstPrice = closingPrices[0];
            const lastPrice = closingPrices[closingPrices.length - 1];
            const color = lastPrice >= firstPrice ? 'green' : 'red';

            const chartData = {
                labels: dates,
                datasets: [{
                    label: 'Price',
                    data: closingPrices,
                    borderColor: color,
                    backgroundColor: color,
                    fill: false,
                    pointRadius: 0
                }]
            };
            
            if (priceChart) {
                priceChart.data = chartData;
                priceChart.update();
            }
            else {
                priceChart = new Chart(priceChartElement, {
                    type: 'line',
                    data: chartData,
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        animation: false
                    }
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const pickButton = document.getElementById('pickButton');
pickButton.addEventListener('click', updateStockInfo);

// Fetch the symbols when the page loads
document.addEventListener('DOMContentLoaded', fetchSymbols);
