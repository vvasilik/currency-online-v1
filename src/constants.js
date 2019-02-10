export const dotNumberKey = 'dotNumber';
export const minNum = 0;
export const maxNum = 5;
export const defaultNum = 2;
export const currency = document.querySelector('.currency');
export const usedCurrenciesKey = 'usedCurrency';
export const inputEl = currency.querySelector('.input');
export const getBtn = currency.querySelector('.get');
export const clearBtn = currency.querySelector('.clear');
export const resEl = currency.querySelector('.result');
export const fromEl = currency.querySelector('.select-from');
export const toEl = currency.querySelector('.select-to');
export const burger = currency.querySelector('.menu');
export const reverse = currency.querySelector('.reverse');
export const saveDefaultBtn = currency.querySelector('.save-default');
export const defaultFrom = currency.querySelector('.default-from');
export const defaultTo = currency.querySelector('.default-to');
export const saveDotBtn = currency.querySelector('.save-dot-number');
export const dotNumberInput = currency.querySelector('.dot-number');
export const addCurrencySelect = currency.querySelector('.add-currency-select');
export const saveAddCurrencyBtn = currency.querySelector('.save-add-currency');
export const setInitialCurrenciesBtn = currency.querySelector('.set-initial-btn');
export const isFromAttr = 'isFrom';
export const isToAttr = 'isTo';
export const apiGetAll = 'https://free.currencyconverterapi.com/api/v6/currencies';
export const apiGetValue = 'https://free.currencyconverterapi.com/api/v5/convert';
export const initialUsedCurrencies = [
	{id: 'PLN', currencyName: 'Polish Zloty', name: 'Polish Zloty', [isFromAttr]:true},
	{id: 'EUR', currencyName: 'Euro', name: 'Euro'},
	{id: 'USD', currencyName: 'United States Dollar', name: 'United States Dollar'},
	{id: 'UAH', currencyName: 'Ukrainian Hryvnia', name: 'Ukrainian Hryvnia', [isToAttr]:true},
	{id: 'RUB', currencyName: 'Russian Ruble', name: 'Russian Ruble'}
]