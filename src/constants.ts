

export const dotNumberKey = 'dotNumber';
export const minNum = 0;
export const maxNum = 5;
export const defaultNum = 2;
export const currency:HTMLElement = document.querySelector('.currency');
export const usedCurrenciesKey = 'usedCurrency';
export const inputEl:HTMLInputElement = currency.querySelector('.input');
export const getBtn:HTMLElement = currency.querySelector('.get');
export const clearBtn:HTMLElement = currency.querySelector('.clear');
export const resEl:HTMLElement = currency.querySelector('.result');
export const fromEl:HTMLSelectElement = currency.querySelector('.select-from');
export const toEl:HTMLSelectElement = currency.querySelector('.select-to');
export const burger:HTMLElement = currency.querySelector('.menu');
export const reverse:HTMLElement = currency.querySelector('.reverse');
export const saveDefaultBtn:HTMLElement = currency.querySelector('.save-default');
export const defaultFrom:HTMLSelectElement = currency.querySelector('.default-from');
export const defaultTo:HTMLSelectElement = currency.querySelector('.default-to');
export const saveDotBtn:HTMLElement = currency.querySelector('.save-dot-number');
export const dotNumberInput:HTMLInputElement = currency.querySelector('.dot-number');
export const addCurrencySelect:HTMLSelectElement = currency.querySelector('.add-currency-select');
export const saveAddCurrencyBtn:HTMLElement = currency.querySelector('.save-add-currency');
export const setInitialCurrenciesBtn:HTMLElement = currency.querySelector('.set-initial-btn');
export const isFromAttr = 'isFrom';
export const isToAttr = 'isTo';
export const apiKey = 'a13681c8faf6a7aa50d9';
export const apiKeyPath = `&apiKey=${apiKey}`;
export const apiGetValue = 'https://free.currencyconverterapi.com/api/v5/convert';
export const apiGetAll = `https://free.currencyconverterapi.com/api/v6/currencies${apiKeyPath}`;
export const initialUsedCurrencies = [
	{id: 'PLN', currencyName: 'Polish Zloty', name: 'Polish Zloty', [isFromAttr]:true},
	{id: 'EUR', currencyName: 'Euro', name: 'Euro'},
	{id: 'USD', currencyName: 'United States Dollar', name: 'United States Dollar'},
	{id: 'UAH', currencyName: 'Ukrainian Hryvnia', name: 'Ukrainian Hryvnia', [isToAttr]:true},
	{id: 'RUB', currencyName: 'Russian Ruble', name: 'Russian Ruble'}
]