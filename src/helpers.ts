import { apiGetValue, fromEl, toEl, defaultFrom, defaultTo, inputEl, resEl } from './constants';

interface OptionSettings {
	isShort: Boolean,
	selectPosition: string
}

export function getQuery(itemFrom, itemTo) {
	return `${apiGetValue}?q=${itemFrom}_${itemTo}&compact=y`;
}

export function clearSelectors() {
	fromEl.innerHTML = '';
	toEl.innerHTML = '';
	defaultFrom.innerHTML = '';
	defaultTo.innerHTML = '';
}

export function clear() {
	inputEl.value = '';
	resEl.innerText = '';
	inputEl.focus();
}

export function getMountedOptions(data, settings?:OptionSettings) {
	const options = Object.keys(data)
		.map(item => createOption(data[item], settings))
		.sort((a,b) => a.dataset.name < b.dataset.name ? -1 : 1);
	const wrapper = document.createDocumentFragment();

	options.forEach(item => wrapper.appendChild(item));

	return wrapper;
}

export function createOption(item, settings:OptionSettings) {
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