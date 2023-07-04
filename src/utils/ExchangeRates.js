import axios from "axios";
import { useExchangeRateStore } from "../stores/ExchangeRateStore";
import { useRenderDataStore } from "../stores/RenderDataStore";

const baseUrl = import.meta.env.VITE_COINAPI_BASE_URL;
const exchangeRatePath = import.meta.env.VITE_COINAPI_EXCHANGE_RATE_PATH;
const apiKey = import.meta.env.VITE_COINAPI_KEY;

export function getRate(crypto, fiat) {

    // get exchange rate for 1 crypto = x fiat
    axios({
        method: 'get',
        url: baseUrl + exchangeRatePath + crypto + "/" + fiat,
        headers: {
            'X-CoinAPI-Key': apiKey
        }
    })
    .then((res) => {
        console.log('🔥 Exchange rate: ' + crypto + ' - ' + fiat, res);

        if(res.status) {
            saveDataToStore(res.data);
        }
    })
    .catch((err) => {
        // silent fail
        console.log('🫠 ' + err.response?.status, err.response?.data.error);
    });
}

function saveDataToStore(data) {
    let { asset_id_base, asset_id_quote, rate, time } = data;

    // store it in global state
    const er = useExchangeRateStore();
    er.addExchangeRate({
        currency: asset_id_base,
        native_currency: asset_id_quote,
        rate,
        time
    });
}

// different approach

export function updateRates() {
    const rd = useRenderDataStore();

    // loop through all the crypto the user has and get the exchange rates
    rd.data.crypto.data.forEach((v, i) => {
        getCryptoRate(v.currency, v.native_currency, v.amount, i, theCallback);
    });

}

function getCryptoRate(crypto, fiat, amount, index, callback) {
    // get exchange rate for 1 crypto = x fiat
    axios({
        method: 'get',
        url: baseUrl + exchangeRatePath + crypto + "/" + fiat,
        headers: {
            'X-CoinAPI-Key': apiKey
        }
    }) // pass the response to the callback, together with amount and index
    .then((res) => callback(res, amount, index, 1))
    .catch((err) => callback(err, amount, index, 0));
}

function theCallback(res, amount, index, s) {
    let rate = s ? res.data.rate : 0;

    // update data store
    const rd = useRenderDataStore();
    rd.updateCryptoRates(index, rate, amount * rate);
}