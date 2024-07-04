/*
 *
 *   Just some small utilities for number and string formatting
 *
 */

const lang = window.navigator.language || window.navigator.userLanguage;

export function formatCurrency(c) {
	return new Intl.NumberFormat(lang).format((c * 1).toFixed(2));
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
