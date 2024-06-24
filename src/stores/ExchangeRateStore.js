import { defineStore } from "pinia";

export const useExchangeRateStore = defineStore("exchangeRateStore", {
	state: () => ({
		exchangeRates: [],
	}),
	getters: {
		isEmpty() {
			return this.exchangeRates.length === 0;
		},
		getCount() {
			return this.exchangeRates.length;
		},
		getRate: (state) => (curr) => {
			// need work
			if (state.isEmpty) {
				console.warn("", "No rates yet");
				return false;
			}

			var exists = state.exchangeRates.findIndex((i) => i.currency == curr);

			if (exists == -1) {
				return false;
			} else {
				return state.exchangeRates[exists];
			}
		},
	},
	actions: {
		addExchangeRate(er) {
			this.exchangeRates.push(er);
		},
	},
});
