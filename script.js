const accBalanceEl = document.getElementById('acc-balance');
const cashBalanceEl = document.getElementById('cash-balance');
const logWindowEl = document.getElementById('log-window');
const operationTypeEl = document.getElementById('operation-type');
const operationAmountEl = document.getElementById('operation-amount');
const processBtn = document.getElementById('process-btn');
const inputBalanceEl = document.getElementById('input-balance');
const outputBalanceEl = document.getElementById('output-balance');
const currencyEl = document.getElementById('currency');
const convertBtn = document.getElementById('convert-btn');

let accountBalance = 1000;
let cashBalance = 1000;
let logCounter = 1;

function addLogMessage(message) {
    logWindowEl.innerHTML += `<p>${logCounter}, ${message}</p>`;
    logCounter++;
    logWindowEl.scrollTop = logWindowEl.scrollHeight;
}

processBtn.addEventListener('click', () => {
    const amount = parseFloat(operationAmountEl.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    if (operationTypeEl.value === 'deposit') {
        if (amount > cashBalance) {
            alert("Insufficient cash to deposit.");
            return;
        }
        accountBalance += amount;
        cashBalance -= amount;
    } else {
        if (amount > accountBalance) {
            alert("Insufficient funds in account to withdraw.");
            return;
        }
        accountBalance -= amount;
        cashBalance += amount;
    }

    accBalanceEl.value = accountBalance;
    cashBalanceEl.value = cashBalance;
    addLogMessage(`Account: ${accountBalance}, Cash: ${cashBalance}`);
    operationAmountEl.value = '';
});

convertBtn.addEventListener('click', () => {
    const amount = parseFloat(inputBalanceEl.value);
    const usdToThbRate = 36.5;

    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid amount to convert.");
        return;
    }

    let result = 0;
    if (currencyEl.value === 'usd') {
        result = amount * usdToThbRate;
    } else {
        result = amount / usdToThbRate;
    }

    outputBalanceEl.value = result.toFixed(2);
});

cashBalanceEl.value = cashBalance;
addLogMessage(`Current account balance: ${accountBalance}, Current cash balance: ${cashBalance}`);