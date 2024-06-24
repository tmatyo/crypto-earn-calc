/*
 *
 *   Just some small utilities for number and string formatting
 *
 */

const lang = window.navigator.language || window.navigator.userLanguage;

export function formatCurrency(c) {
	return new Intl.NumberFormat(lang).format((c * 1).toFixed(2));
}
