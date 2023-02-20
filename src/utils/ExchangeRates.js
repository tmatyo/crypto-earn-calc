import axios from "axios";
import { useTransactionStore } from "../stores/TransactionStore";

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

        // store it in global state
        const tas = useTransactionStore();
        tas.addExchangeRate(res.data);
    })
    .catch((err) => console.error('🫠', err));
}