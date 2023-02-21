import { defineStore } from 'pinia'

export const useExchangeRateStore = defineStore('exchangeRateStore', {
    state: () => ({
        exchangeRates: []
    }),
    getters: {
        isEmpty() {
            return this.exchangeRates.length === 0;
        },
        getCount() {
            return this.exchangeRates.length;
        },
    },
    actions: {
        addExchangeRate(er) {
            this.exchangeRates.push(er);
        }
    }
});