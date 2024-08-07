/*
 *
 *   Just some small utilities for number and string formatting
 *
 */

export const lang = window.navigator.language || window.navigator.userLanguage;

export function formatCurrency(c) {
	c *= 1;
	let options = {};

	if (c < 0.01) {
		options = { maximumFractionDigits: 7 };
	} else {
		c = c.toFixed(2);
	}

	return new Intl.NumberFormat(lang, options).format(c);
}

export function uniqBy(arr, predicate) {
	const cb = typeof predicate === "function" ? predicate : (o) => o[predicate];

	return [
		...arr
			.reduce((map, item) => {
				const key = item === null || item === undefined ? item : cb(item);
				map.has(key) || map.set(key, item);
				return map;
			}, new Map())
			.values(),
	];
}
