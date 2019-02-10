import {
	dotNumberKey, minNum, maxNum, defaultNum, usedCurrenciesKey,
	inputEl, getBtn, clearBtn, resEl, fromEl, toEl,	burger, reverse,
	saveDefaultBtn,	defaultFrom, defaultTo,	saveDotBtn,	dotNumberInput,
	addCurrencySelect, saveAddCurrencyBtn,	setInitialCurrenciesBtn,
	isFromAttr,	isToAttr, apiGetAll, apiGetValue, initialUsedCurrencies
} from './constants';

let allCurrencies;

initialize();

function initialize() {
	initNotification();
	initListeners();
	setCurrenciesSelectors();
	setDefaultDot();
	setAllCurrencies();
};

function initNotification() {
	if (typeof(Notification) === 'undefined') {
		return;
	}
	Notification.requestPermission(function(status) {
		console.log('Notification permission status:', status);
	});
}

function initListeners() {
	getBtn.addEventListener('click', getCurrency);
	clearBtn.addEventListener('click', clear);
	burger.addEventListener('click', toggleMenu);
	reverse.addEventListener('click', toggleCurrency);
	saveDefaultBtn.addEventListener('click', saveDefaultHandler);
	saveDotBtn.addEventListener('click', saveDotNumber);
	saveAddCurrencyBtn.addEventListener('click', saveAddCurrency);
	setInitialCurrenciesBtn.addEventListener('click', setInitialCurrencies);
}

function setCurrenciesSelectors() {
	clearSelectors();
	setSelectors();
}

function clearSelectors() {
	fromEl.innerHTML = '';
	toEl.innerHTML = '';
	defaultFrom.innerHTML = '';
	defaultTo.innerHTML = '';
}

function setSelectors() {
	const data = getData(usedCurrenciesKey) || initialUsedCurrencies;

	fromEl.appendChild(getMountedOptions(data, {selectPosition: isFromAttr, isShort: true}));
	toEl.appendChild(getMountedOptions(data, {selectPosition: isToAttr, isShort: true}));
	defaultFrom.appendChild(getMountedOptions(data, {selectPosition: isFromAttr, isShort: true}));
	defaultTo.appendChild(getMountedOptions(data, {selectPosition: isToAttr, isShort: true}));
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
	const num = Number(inputEl.value);
	const numDotStored = getData(dotNumberKey);
	const numDot = numDotStored !== null ? numDotStored : defaultNum;

	resEl.innerText = Math.round(rate * num * Math.pow(10, numDot)) / Math.pow(10, numDot);
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
	return `${apiGetValue}?q=${itemFrom}_${itemTo}&compact=y`;
}

function displayNotification(text) {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification(text);
        });
    }
}

function saveDefaultHandler() {
	const firstValue = defaultFrom[defaultFrom.selectedIndex].id;
	const secondValue = defaultTo[defaultTo.selectedIndex].id;
	const data = getData(usedCurrenciesKey) || initialUsedCurrencies;

	data.forEach(item => {
		const id = item.id

		item[isFromAttr] = false;
		item[isToAttr] = false;

		if (id === firstValue) {
			item[isFromAttr] = true;
		}

		if (id === secondValue) {
			item[isToAttr] = true;
		}
	});
	saveData(usedCurrenciesKey, data);
	setCurrenciesSelectors();
	toggleMenu();
}

function saveData(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
	const data = localStorage.getItem(key);

	return JSON.parse(data);
}

function setDefaultDot() {
	const data = getData(dotNumberKey);

	dotNumberInput.value = data !== null ? data : defaultNum;
}

function saveDotNumber() {
	const value = Number(dotNumberInput.value);
	const num = (value < minNum || value > maxNum) ? defaultNum : value;

	saveData(dotNumberKey, num);
	toggleMenu();
}

function setAllCurrencies() {
	fetch(apiGetAll)
		.then(res => res.json())
		.then(data => {
			allCurrencies = data.results;
			mountAllCurrencies(allCurrencies);
		})
}

function mountAllCurrencies(data=allCurrencies) {
	const filteredData = filterAlreadyExist(data);
	const mountedOptions = getMountedOptions(filteredData);

	addCurrencySelect.innerHTML = '';
	addCurrencySelect.appendChild(mountedOptions);
}

function filterAlreadyExist(data) {
	const usedCurrencies = getData(usedCurrenciesKey) || initialUsedCurrencies;
	const res = {};

	Object.keys(data).forEach(item => {
		const id = data[item].id;
		if (usedCurrencies.filter(currency => currency.id === item).length === 0) {
			res[id] = data[id];
		}
	});

	return res;
}

function getMountedOptions(data, settings) {
	const options = Object.keys(data)
		.map(item => createOption(data[item], settings))
		.sort((a,b) => a.dataset.name < b.dataset.name ? -1 : 1);
	const wrapper = document.createDocumentFragment();

	options.forEach(item => wrapper.appendChild(item));

	return wrapper;
}

function createOption(item, settings={}) {
	const el = document.createElement('option');

	el.value = item.id;
	el.id = item.id;
	el.dataset.name = item.currencyName;

	if (settings.isShort) {
		el.innerText = item.id;
	} else {
		el.innerText = `${item.currencyName} (${item.id})`;
	}

	if (item[settings.selectPosition]) {
		el.selected = true;
	} else {
		el.selected = false;
	}

	return el;
}

function saveAddCurrency() {
	const usedCurrencies = getData(usedCurrenciesKey) || initialUsedCurrencies;
	const newCurrency = addCurrencySelect[addCurrencySelect.selectedIndex];
	const newCurrencies = [...usedCurrencies];

	newCurrencies.push({
		id: newCurrency.id,
		currencyName: newCurrency.innerText
	})

	saveData(usedCurrenciesKey, newCurrencies);
	setCurrenciesSelectors();
	mountAllCurrencies();
	toggleMenu();
}

function setInitialCurrencies() {
	saveData(usedCurrenciesKey, null);
	mountAllCurrencies();
	setCurrenciesSelectors();
	toggleMenu();
}