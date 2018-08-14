const currency = document.querySelector('.currency');
const inputEl = currency.querySelector('.input');
const getBtn = currency.querySelector('.get');
const resEl = currency.querySelector('.result');
const fromEl = currency.querySelector('.select-from');
const toEl = currency.querySelector('.select-to');

getBtn.addEventListener('click', getCurrency);

function getCurrency() {
	const fromVal = fromEl.value;
	const toVal = toEl.value;
	const query = `https://free.currencyconverterapi.com/api/v5/convert?q=${fromVal}_${toVal}&compact=y`;

	fetch(query)
		.then(resp=> {return resp.json()})
		.then(data=>{
			let rate = 1;

			for (let item in data) {
				rate = data[item].val;
			}

			calculate(rate);
		})
		.catch(() => resEl.innerText = 'Some problems with request');
}

function calculate(rate) {
	const num = inputEl.value;

	resEl.innerText = Math.round(rate * num * 100) / 100;
}