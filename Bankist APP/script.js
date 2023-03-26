'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-01T14:18:46.235Z',
    '2023-01-05T16:33:06.386Z',
    '2023-03-07T14:43:26.374Z',
    '2023-03-08T18:49:59.371Z',
    '2023-03-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-01T14:18:46.235Z',
    '2023-01-05T16:33:06.386Z',
    '2023-03-01T14:43:26.374Z',
    '2023-03-05T18:49:59.371Z',
    '2023-03-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-01T14:18:46.235Z',
    '2023-01-05T16:33:06.386Z',
    '2023-03-01T14:43:26.374Z',
    '2023-03-05T18:49:59.371Z',
    '2023-03-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Aris Andrikopoulos',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-01T14:18:46.235Z',
    '2023-01-05T16:33:06.386Z',
    '2023-03-01T14:43:26.374Z',
    '2023-03-05T18:49:59.371Z',
    '2023-03-09T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const label = document.querySelector('.balance__label');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const toUsd = document.querySelector('.convertionUS');
const image = document.querySelector('.logo');
const overlay = document.querySelector('.overlay');
const loanBox = document.querySelector('.operation operation--loan');
const rows = document.querySelectorAll('.movements__row');
const timer = document.querySelector('.timer');
const confirmBtn = document.querySelector('.BtnConfirm');
const declineBtn = document.querySelector('.BtnDecline');
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////// CREATING THE APP//////

/////////////////////////////////////////////////
// Functions

const startLogoutTimer = function () {
  //set time to logout
  let time = 300;
  //set the interval
  const interval = setInterval(() => {
    const secs = String(time % 60).padStart(2, 0);
    const mins = String(Math.trunc(time / 60)).padStart(2, 0);
    //show time in ui
    labelTimer.textContent = `${mins}:${secs}`;
    //remove from time each second
    time--;
    //hide ui
    if (time === 0) {
      clearInterval(interval);
      containerApp.style.opacity = 0;
    }
  }, 1000);
};

const dateDisplay = function () {
  const options = {
    weekday: 'long',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const locale = navigator.language;
  const newDate = new Date();
  return (labelDate.textContent = new Intl.DateTimeFormat(
    locale,
    options
  ).format(newDate));
};
//date for movements
const dateForMovements = function (date) {
  //function to calculate how many days have passed since each transaction///
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  /////////////////////////////////////////////////////////////////////////
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) {
    return `Today`;
  }
  if (daysPassed === 1) {
    return `Yesterday`;
  }
  if (daysPassed === 2) {
    return `3 Days Ago`;
  }

  const locale = navigator.language;
  return new Intl.DateTimeFormat(locale).format(date);
};

//DISPLAY MOVEMENTS FUNCTION IN THE UI
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const dateMovements = dateForMovements(date);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${dateMovements}</div>
        <div class="movements__value"> ${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//CREATING USER NAMES FOR USER INPUT
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//BALANCE DISPLAY FUNCTION
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};
//CONVERTION FROM EU TO US///////////////////////////////////
const ConvertUS = function (deposits) {
  return deposits
    .filter(move => move > 0)
    .map(move => Math.round(move * 1.1))
    .reduce((accum, move) => accum + move, 0);
};
const ConvertEU = function (deposits) {
  return deposits
    .filter(move => move > 0)
    .map(move => Math.round(move * 0.63))
    .reduce((accum, move) => accum + move, 0);
};
////////////////////////////////////////////////////////////

//DISPLAY THE SUMMARY OF THE DEPOSITS
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

//SINGLE FUNCTION TO DISPLAY THE UI
const updateUI = function (acc) {
  //display timer
  startLogoutTimer();

  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

  //display Date
  dateDisplay(acc);
};

///////////////////////////////////////
/*************************************Event handlers******************************/
/******************LOGIN BUTTON************************* */
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent element from reloading
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
    //stop the animation
    image.classList.add('paused');
  }
});

//convertion from EURO TO DOLLAR and back
let pressed = true;
toUsd.addEventListener('click', function () {
  if (pressed) {
    labelBalance.textContent = `${ConvertUS(currentAccount.movements)}$`;
    toUsd.textContent = 'To EUR';
  } else {
    labelBalance.textContent = `${ConvertEU(currentAccount.movements)}€`;
    toUsd.textContent = 'To USD';
  }
  pressed = !pressed;
});
/**************************************TRANSFER BUTTON***************************** */
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = ' ';
  inputTransferAmount.blur();
  if (
    //THE AMOUNT SENT MUST BE > 0
    amount > 0 &&
    //RECEIVER MUST EXIST
    receiver &&
    //THE AMOUNT WE SEND MUST NOT EXCEED OUR INCOMES
    currentAccount.balance >= amount &&
    //CHECK IF RECEIVER EXISTS AND ALSO WE CANNOT SEND MONEY TO OURSELF
    receiver?.username !== currentAccount.username
  ) {
    //transfer done
    setTimeout(() => {
      document.querySelector('.tranferMoney').style.color = 'green';
      document.querySelector('.tranferMoney').textContent =
        'Processing Request...';
    }, 1000);
    setTimeout(() => {
      document.querySelector('.tranferMoney').textContent =
        'Tranfer Completed ✅';
    }, 3000);
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiver.movementsDates.push(new Date().toISOString());
    //updating UI

    updateUI(currentAccount);
  }
});

/*******************REQUEST A LOAN*************** */
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  const loan = currentAccount.movements.some(move => move >= amount / 10);

  if (amount > 0 && loan) {
    //add movement
    setTimeout(() => {
      document.querySelector('.loanText').style.color = 'green';
      document.querySelector('.loanText').textContent = 'Processing Request...';
    }, 500);

    setTimeout(() => {
      document.querySelector('.loanText').textContent = 'Loan Granted ✅';
    }, 2000);

    inputLoanAmount.value = ' ';
    //update UI
    currentAccount.movements.push(amount);

    //date display in movements
    currentAccount.movementsDates.push(new Date().toISOString());
    setTimeout(() => {
      updateUI(currentAccount);
    }, 2000);

    //clear the values
    inputLoanAmount.value = ' ';
  } else if (amount > loan) {
    //set timer for UI
    setTimeout(() => {
      document.querySelector('.loanText').style.color = 'green';
      document.querySelector('.loanText').textContent = 'Processing Request...';
    }, 500);
    //return false with message in the UI
    setTimeout(() => {
      document.querySelector('.loanText').style.color = 'red';
      document.querySelector('.loanText').textContent = 'Request Denied';
    }, 3500);
    inputLoanAmount.value = ' ';
  }
});
/************************CLOSE BUTTON*************************** */
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    overlay.style.visibility = 'visible';
    confirmBtn.addEventListener('click', function () {
      overlay.style.visibility = 'hidden';
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      //delete account
      accounts.splice(index, 1);
      // hide the UI of deleted user
      containerApp.style.opacity = 0;
    });
  }
  declineBtn.addEventListener('click', function () {
    overlay.style.visibility = 'hidden';
  });
});

/***********************SORT BUTTON******* */
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
