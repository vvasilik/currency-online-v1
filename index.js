const currency = document.querySelector('.currency');
const inputEl = currency.querySelector('.input');
const getBtn = currency.querySelector('.get');
const clearBtn = currency.querySelector('.clear');
const resEl = currency.querySelector('.result');
const fromEl = currency.querySelector('.select-from');
const toEl = currency.querySelector('.select-to');
const burger = currency.querySelector('.menu');

initialize();

function initialize() {
	initNotification();
	initWorker();
	initListeners();
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
		.then(resp=> {return resp.json()})
		.then(data=>{
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