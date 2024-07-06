import axios from "axios";
import { useExchangeRateStore } from "../stores/ExchangeRateStore";
import { useRenderDataStore } from "../stores/RenderDataStore";
import rates from "../mock/exchangeRatesResponse.json";
import { setCookie, getCookie, removeCookie } from "./Cookies";

const nodeEnv = import.meta.env.VITE_NODE_ENV;
const baseUrl = import.meta.env.VITE_COINAPI_BASE_URL;
const exchangeRatePath = import.meta.env.VITE_COINAPI_EXCHANGE_RATE_PATH;
const assetsPath = import.meta.env.VITE_COINAPI_ASSETS_PATH;
const apiKey = import.meta.env.VITE_COINAPI_KEY;
const conflictToleranceInMiliseconds = 1200;
const cryptoRates = "cryptoRates";
const nativeCurrency = "EUR";

function isVariableFalsy(variable) {
	return typeof variable === "undefined" || typeof variable === "null" || variable.length === 0;
}

function isDev() {
	return nodeEnv === "dev" || nodeEnv === "" || !nodeEnv;
}

// function getMockedCryptoRate(crypto, amount, index, callback) {
// 	let data = { rate: rates[crypto].rate };
// 	callback({ data }, amount, index, 1);
// }

function getMockedExchangeRates() {
	parseResult({ data: rates });
}

// export function getRate(crypto, fiat) {
// 	// get exchange rate for 1 crypto = x fiat
// 	axios({
// 		method: "get",
// 		url: baseUrl + exchangeRatePath + crypto + "/" + fiat,
// 		headers: {
// 			"X-CoinAPI-Key": apiKey,
// 		},
// 	})
// 		.then((res) => {
// 			console.log("🔥 Exchange rate: " + crypto + " - " + fiat, res);

// 			if (res.status) {
// 				saveDataToStore(res.data);
// 			}
// 		})
// 		.catch((err) => {
// 			// silent fail
// 			console.log("🫠 " + err.response?.status, err.response?.data.error);
// 		});
// }

// function saveDataToStore(data) {
// 	let { asset_id_base, asset_id_quote, rate, time } = data;

// 	// store it in global state
// 	const er = useExchangeRateStore();
// 	er.addExchangeRate({
// 		currency: asset_id_base,
// 		native_currency: asset_id_quote,
// 		rate,
// 		time,
// 	});
// }

// different approach

export function updateRates(assetStringList) {
	console.log(assetStringList);
	let enviro = isDev();
	console.log("env is dev?", enviro);
	enviro
		? //? getMockedCryptoRate(v.currency, v.amount, i, theCallback)
			getMockedExchangeRates()
		: //: getCryptoRate(v.currency, v.native_currency, v.amount, i, theCallback);
			getExchangeRates(assetStringList);
}

// async function getCryptoRate(crypto, fiat, amount, index, callback) {
// 	console.log("Coins", "Getting rate for " + crypto);
// 	if (index != 0) await preventApiLimitAbusement(conflictToleranceInMiliseconds);

// 	let result = null;
// 	try {
// 		// get exchange rate for 1 crypto = x fiat
// 		result = await axios({
// 			method: "get",
// 			url: baseUrl + exchangeRatePath + crypto + "/" + fiat,
// 			headers: {
// 				"X-CoinAPI-Key": apiKey,
// 			},
// 		});

// 		// pass the response to the callback, together with amount and index
// 		callback(result, amount, index, 1);
// 	} catch (error) {
// 		callback(error, amount, index, 0);
// 	}
// }

// function theCallback(res, amount, index, s) {
// 	let rate = s ? res.data.rate : 0;

// 	// update data store
// 	const rd = useRenderDataStore();
// 	rd.updateCryptoRates(index, rate, amount * rate);

// 	if (rd.data.crypto.data.length - 1 === index) {
// 		rd.calculateYield();
// 	}
// }

// async function preventApiLimitAbusement(ms) {
// 	console.log("We are waiting " + ms + " ms");
// 	return new Promise((res) => setTimeout(res, ms));
// }

// v3

export async function getExchangeRates(assetStringList) {
	let cookie = getCookie(cryptoRates);
	if (cookie) {
		console.log("reading cookie:", JSON.parse(cookie));
		getRatesFromResult(JSON.parse(cookie));
	} else {
		let result = [];

		if (
			isVariableFalsy(baseUrl) ||
			isVariableFalsy(assetsPath) ||
			isVariableFalsy(apiKey) ||
			isVariableFalsy(assetStringList)
		) {
			console.warn("getExchangeRates:", "env variable missing");
			return;
		}

		// get exchange rate for 1 all assets
		try {
			result = await axios({
				method: "get",
				url: `${baseUrl}${assetsPath}${nativeCurrency},${assetStringList} `,
				headers: {
					"X-CoinAPI-Key": apiKey,
				},
			});
			console.log(result);
			parseResult(result);
		} catch (error) {
			console.log(error);
		}
	}
}

function parseResult(result) {
	if (result.data.length < 1) {
		console.warn("getRatesFromResult:", "result not complete or empty");
	}

	let eurToUsd = 1;
	for (const r of result.data) {
		if (r.asset_id === nativeCurrency) eurToUsd = r.price_usd;
	}

	let rates = result.data.map((r) => {
		return {
			currency: r.asset_id,
			rate: r.asset_id === nativeCurrency ? r.price_usd : r.price_usd / eurToUsd,
		};
	});

	if (!isDev()) {
		let d = new Date();
		d.setHours(d.getHours() + 1);
		setCookie(cryptoRates, JSON.stringify(rates), d);
		console.log("writing cookie", JSON.stringify(rates));
	}

	getRatesFromResult(rates);
}

function getRatesFromResult(res) {
	// update data store
	const rd = useRenderDataStore();
	for (const [index, coin] of rd.data.crypto.data.entries()) {
		for (const i of res) {
			if (i.currency === coin.currency) rd.updateCryptoRates(index, i.rate, i.rate * coin.amount);
		}

		if (rd.data.crypto.data.length - 1 === index) rd.calculateYield();
	}
}
