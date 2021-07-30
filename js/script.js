'use strict';

//DOM Elements
const msgText = document.querySelector('.msg');
const logDateTime = document.querySelector('.date');
const allInputs = document.querySelectorAll('input');
const playArea = document.querySelector('.playArea')
const listGroup = document.querySelector('.list-group');
const moneyIN = document.querySelector('.in');
const moneyOUT = document.querySelector('.out');
const currentBalance = document.querySelector('#balance');
const userName = document.querySelector('#user');
const passWord = document.querySelector('#pin');
const logSubmit = document.querySelector('.submit');
const transferBtn = document.querySelector('#transferBtn');
const transferTo = document.querySelector('#transferTo');
const transferAmount = document.querySelector('#transferAmount');
const loanAmount = document.querySelector('#loanAmount');
const loanBtn = document.querySelector('#loanBtn');
const confirmBtn = document.querySelector('#confirmBtn');
const confirmUser = document.querySelector('#confirmUser');
const confirmPin = document.querySelector('#confirmPin');
const sortBtn = document.querySelector('.sortBtn');
const togBtn = document.querySelector('#togBtn');
const logOutTime = document.querySelector('.logOutTime');




// ----------------------------------------------------
const accounts = [{
    owner: "Uzair Baig",
    movements: [1213, -300, 800, 900, -700, 321, -89, -98, 700],
    interestRate: 0,
    pin: '007',
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-07-24T17:01:17.194Z',
        '2021-07-28T23:36:17.929Z',
        '2021-07-29T10:51:36.790Z',
    ],
    local: 'en-gb',
},
{
    owner: "Zohair Baig",
    movements: [-1213, +300, 800, 900, -700, 321, -89, -98, 7000, -300],
    interestRate: 0,
    pin: '007',
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
        '2020-07-15T10:51:36.790Z',
        '2020-07-19T23:36:17.929Z',
    ],
    local: 'en-us',
},
{
    owner: "Asad Baig",
    movements: [4113, 300, 800, 900, -700, 321, -89, -98, 700],
    interestRate: 0,
    pin: '007',
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    local: 'en-us',
}, {
    owner: "Nawal Baig",
    movements: [1213, 300, 800, 900, 700, 321, -89, -98, 700],
    interestRate: 0,
    pin: '007',
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-07-24T17:01:17.194Z',
        '2021-07-28T23:36:17.929Z',
        '2021-07-29T10:51:36.790Z',
    ],

    local: 'ur',
}
];

// ----------------------------------------------------


//Functions


const calcDate = function (date, local) {
    date = new Date(date);
    const days = Math.trunc(+(new Date() - date) / (24 * 60 * 60 * 1000));
    console.log();
    if (days == 0)
        return 'TODAY'
    else if (days == 1)
        return 'YESTERDAY';
    else if (days <= 7)
        return `${days + 1} DAYS AGO`
    return new Intl.DateTimeFormat(local).format(new Date(date));
};

const calcCurrency = function (amount) {
    return Intl.NumberFormat(currentUser.local, {
        style: 'currency',
        currency: currentCurrency,
    }).format(amount).replace(/(\.|,)00$/g, '');
}

const createMovements = function (acc, sortStatus) {
    const moveNew = sortStatus ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    listGroup.textContent = '';
    moveNew.forEach(function (movement, index) {
        const status = movement >= 0 ? `Deposit` : `Withdrawal`;
        const date = calcDate(acc.movementsDates[index], acc.local);
        const code = `  <li class="list-group-item">
        <span class="transactionNo ${status}">${index + 1} ${status}</span> <span
        class="transactionDate">${date}
        </span> <span class="transactionAmount">${calcCurrency(Math.abs(movement))}</span>
        </li>`;
        listGroup.insertAdjacentHTML('afterbegin', code);
    });
}

const calculateBalance = function (acc) {
    acc.currentBalance = acc.movements.reduce((previous, current) => previous + current, 0);
    currentBalance.textContent = calcCurrency(+acc.currentBalance)
}

const calculateIN = function (acc) {
    moneyIN.textContent = calcCurrency(+(acc.movements.filter(item => item > 0).reduce((previous, current) => +(previous + current), 0)));
}

const calculateOUT = function (acc) {
    moneyOUT.textContent = calcCurrency(+(acc.movements.filter(item => item < 0).reduce((previous, current) => +(previous + Math.abs(current)), 0)));
}


const updateUI = function (acc) {
    if (!acc) {
        playArea.style.opacity = 0;
        allInputs.forEach(inp => {
            inp.blur();
            inp.value = '';
        });
        msgText.textContent = `Log in to get started`;
    }
    else {
        allInputs.forEach(inp => {
            inp.blur();
            inp.value = '';
        });
        playArea.style.opacity = 100;
        msgText.textContent = `Good day, ${acc.owner.split(' ')[0]} !`;
        createMovements(acc, sortStatus);
        calculateBalance(acc);
        calculateIN(acc);
        calculateOUT(acc);
    }
}

const poundToPkr = 219.65;
const pkrToPoundConverter = function (mov) {
    return mov.map(mov => +(mov / poundToPkr).toFixed(2));
}
const poundToPkrConverter = function (mov) {
    return mov.map(mov => Math.trunc(mov * poundToPkr));
}

const createUserName = function (accounts) {
    accounts.forEach(acc => acc.userName = acc.owner.toLowerCase().split(' ').map(word => word[0]).join(''));
}

const setCurrentUser = function (accounts) {
    let un = accounts?.find(acc => acc.userName === userName.value);
    let pass = un?.pin === passWord.value;
    return pass && un;


};

let timer;
const setTimer = function () {
    if (timer)
        clearInterval(timer);
    const timerLim = 10 * 60 * 1000 + +(new Date());
    timer = setInterval(() => {
        if (+(timerLim - new Date()) > 0)
            logOutTime.textContent = Intl.DateTimeFormat('en-us', { minute: 'numeric', second: 'numeric' }).format(new Date(timerLim - new Date()));
        else {
            currentUser = '';
            updateUI(currentUser);
            clearInterval(timer);
        }
    }, 1000);
}





//Main --------------------------------------------------------------------
let sortStatus;
let currentUser;
let currentCurrency = 'EUR';
createUserName(accounts)

//Log In
logSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (currentUser) {
        if (currentCurrency == 'PKR')
            currentUser.movements = pkrToPoundConverter(currentUser.movements);
    }
    setTimer();
    currentUser = setCurrentUser(accounts);
    logDateTime.textContent = `As of ${Intl.DateTimeFormat(currentUser.local).format(new Date())}
, ${Intl.DateTimeFormat(currentUser.local, { minute: 'numeric', hour: 'numeric', }).format(new Date())}`;
    currentCurrency = 'EUR';
    togBtn.checked = false;
    updateUI(currentUser);
})

//Transfer Amount
transferBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let un = accounts?.find(acc => acc.userName === transferTo.value);
    if (transferAmount.value > 0 && transferAmount.value <= currentUser.currentBalance && transferTo.value != currentUser.userName) {
        if (currentCurrency == 'EUR')
            un?.movements.push(Number(Math.trunc(transferAmount.value)))
        else
            un?.movements.push(+((transferAmount.value / poundToPkr).toFixed(2)));

        un.movementsDates.push(new Date());
        currentUser.movementsDates.push(new Date());
        currentUser?.movements.push(-1 * Math.trunc(transferAmount.value));
        updateUI(currentUser);
    }
    else
        updateUI(currentUser);
});


//Request Loan
loanBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (currentUser.movements.some(mov => mov * 0.1 >= Number(loanAmount.value))) {
        currentUser.movements.push(Number(loanAmount.value));
        currentUser.movementsDates.push(new Date());
        updateUI(currentUser)
    }
    else
        updateUI(currentUser);
});


//Close Account
confirmBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (confirmUser.value === currentUser.userName && confirmPin.value == currentUser.pin) {
        currentUser = '';
        updateUI(currentUser);
    }
    else
        updateUI(currentUser);
});


//Sort
sortBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (!sortStatus) {
        sortStatus = true;
        createMovements(currentUser, sortStatus);
    }
    else {
        sortStatus = false;
        createMovements(currentUser, sortStatus)
    }

});




//Rs to EUR and vise versa
togBtn.addEventListener('click', function () {
    if (togBtn.checked == true) {
        currentUser.movements = poundToPkrConverter(currentUser.movements);
        currentCurrency = 'PKR';
        updateUI(currentUser);
    }
    else {
        currentUser.movements = pkrToPoundConverter(currentUser.movements);
        currentCurrency = 'EUR';
        updateUI(currentUser);
    }

});


// ----------------------------------------------------