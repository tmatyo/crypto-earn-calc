import axios from "axios";
import { useExchangeRateStore } from "../stores/ExchangeRateStore";

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
        console.log('🔥 Exchange rate:', crypto + " - " + fiat);
        console.log(res);

        switch(res.status) {
            case 200: saveDataToStore(res.data);
            break;

            case 429: console.log('🔥', 'Too many requests');
            break
            
            default: console.log('🔥', 'Default case. Probably problems with the ajax req/res.');
        }
    })
    .catch((err) => {
        // silent fail
        console.log('🫠 ' + err.response.status, err.response.data.error);
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