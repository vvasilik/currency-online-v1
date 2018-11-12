const currency = document.querySelector('.currency');
const inputEl = currency.querySelector('.input');
const getBtn = currency.querySelector('.get');
const clearBtn = currency.querySelector('.clear');
const resEl = currency.querySelector('.result');
const fromEl = currency.querySelector('.select-from');
const toEl = currency.querySelector('.select-to');
const burger = currency.querySelector('.menu');
const reverse = currency.querySelector('.reverse');
const saveDefaultBtn = currency.querySelector('.save-default');
const defaultFrom = currency.querySelector('.default-from');
const defaultTo = currency.querySelector('.default-to');

initialize();

function initialize() {
	initNotification();
	initWorker();
	initListeners();
	setDefaultCurrency();
};

function initNotification() {
	if (typeof(Notification) === 'undefined') {
		return;
	}
	Notification.requestPermission(function(status) {
		console.log('Notification permission status:', status);
	});
}

function initWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('service-worker.js').then(function(reg) {
			console.log('Registration succeeded. Scope is ' + reg.scope);
		}).catch(function(error) {
			console.log('Registration failed with ' + error);
		});
	};
}

function initListeners() {
	getBtn.addEventListener('click', getCurrency);
	clearBtn.addEventListener('click', clear);
	burger.addEventListener('click', toggleMenu);
	reverse.addEventListener('click', toggleCurrency);
	saveDefaultBtn.addEventListener('click', saveDefaultHandler);
}

function getCurrency() {
	const fromVal = fromEl.value;
	const toVal = toEl.value;
	const query = getQuery(fromVal, toVal);

	if (fromVal === toVal) {
		calculate(1);
		return;
	}

	fetch(query)
		.then(resp => {return resp.json()})
		.then(data => {
			let rate = 1;

			for (let item in data) {
				rate = data[item].val;
			}
			if (!navigator.onLine) {
				displayNotification('Application works offline');
			}
			calculate(rate);
		})
		.catch(err => resEl.innerText = `Some problems with request - ${err}`);
}

function calculate(rate) {
	const num = inputEl.value;

	resEl.innerText = Math.round(rate * num * 100) / 100;
}

function clear() {
	inputEl.value = '';
	resEl.innerText = '';
	inputEl.focus();
}

function toggleMenu() {
	const activeClass = '_burger-active';
	const body = document.body;

	if (body.classList.contains(activeClass)) {
		body.classList.remove(activeClass);
	} else {
		body.classList.add(activeClass);
	}
}

function toggleCurrency() {
	const firstIndex = fromEl.selectedIndex;
	const secondIndex = toEl.selectedIndex;

	fromEl[secondIndex].selected = true;
	toEl[firstIndex].selected = true;
}

function getQuery(itemFrom, itemTo) {
	return `https://free.currencyconverterapi.com/api/v5/convert?q=${itemFrom}_${itemTo}&compact=y`;
}

function displayNotification(text) {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification(text);
        });
    }
}

function saveDefaultHandler() {
	const firstValue = defaultFrom[defaultFrom.selectedIndex].innerText;
	const secondValue = defaultTo[defaultTo.selectedIndex].innerText;
	const data = {from: firstValue, to: secondValue};

	setCurrencySelector(data);
	saveData('defaultCurrency', data);
}

function saveData(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
	const data = localStorage.getItem(key);

	return JSON.parse(data);
}

function setDefaultCurrency() {
	const defaultState = getData('defaultCurrency');

	if (!defaultState) {
		return;
	}

	setCurrencySelector(defaultState);
	setDefaultSelector(defaultState);
}

function setCurrencySelector(data) {
	[...fromEl.options].forEach((option, index) => {
		if (option.innerText === data.from) {
			fromEl[index].selected = true;
		}
	});
	[...toEl.options].forEach((option, index) => {
		if (option.innerText === data.to) {
			toEl[index].selected = true;
		}
	});
}

function setDefaultSelector(data) {
	[...defaultFrom.options].forEach((option, index) => {
		if (option.innerText === data.from) {
			defaultFrom[index].selected = true;
		}
	});
	[...defaultTo.options].forEach((option, index) => {
		if (option.innerText === data.to) {
			defaultTo[index].selected = true;
		}
	});
}