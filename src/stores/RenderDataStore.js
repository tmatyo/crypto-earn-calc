import { defineStore } from "pinia";
import { getYield } from "../utils/Calculator";

export const useRenderDataStore = defineStore("renderDataStore", {
	state: () => ({
		data: {
			expenses: {
				meta: {
					count: 0,
					avg: 0.0,
					min: 0.0,
					minDate: "1970-01-01 00:00:00",
					max: 0.0,
					maxDate: "1970-01-01 00:00:00",
					sum: 0.0,
					sortedList: [
						{
							timestamp_utc: "1970-01-01 00:00:00",
							transaction_description: "-",
							currency: "-",
							amount: 0.0,
							native_currency: "-",
							native_amount: 0.0,
						},
					],
				},
				data: [
					{
						timestamp_utc: "1970-01-01 00:00:00",
						transaction_description: "-",
						currency: "-",
						amount: 0.0,
						native_currency: "-",
						native_amount: 0.0,
					},
				],
			},
			earnings: {
				meta: {
					count: 0,
					avg: 0.0,
					min: 0.0,
					minDate: "1970-01-01 00:00:00",
					max: 0.0,
					maxDate: "1970-01-01 00:00:00",
					sum: 0.0,
					sortedList: [
						{
							timestamp_utc: "1970-01-01 00:00:00",
							transaction_description: "-",
							currency: "-",
							amount: 0.0,
							native_currency: "-",
							native_amount: 0.0,
						},
					],
				},
				data: [
					{
						timestamp_utc: "1970-01-01 00:00:00",
						transaction_description: "-",
						currency: "-",
						amount: 0.0,
						native_currency: "-",
						native_amount: 0.0,
					},
				],
			},
			yield: {
				meta: {},
				data: [],
			},
			crypto: {
				meta: {
					aprox_net_worth: 0,
				},
				data: [
					{
						currency: "-",
						amount: 0.0,
						native_currency: "-",
						native_amount: 0.0,
						rate: 0.0,
						current_worth: 0.0,
					},
				],
				bought: [
					{
						currency: "-",
						amount: 0.0,
						native_currency: "-",
						native_amount: 0.0,
						rate: 0.0,
						current_worth: 0.0,
					},
				],
				free: [
					{
						currency: "-",
						amount: 0.0,
						native_currency: "-",
						native_amount: 0.0,
						rate: 0.0,
						current_worth: 0.0,
					},
				],
			},
		},
	}),
	getters: {
		isEmpty: (s) => Object.keys(s.data).length == 0,
		getExpenses: (s) => s.data.expenses.data,
		getEarnings: (s) => s.data.earnings.data,
		getYield: (s) => s.data.yield.data,
	},
	actions: {
		// d = data, c = category, sc = sub category
		updateAll(d) {
			this.data = d;
		},
		addCategory(c, d) {
			this.data[c] = d;
		},
		update(c, sc, d) {
			this.data[c][sc] = d;
		},
		pushTo(c, sc, d) {
			if ("push" in this.data[c][sc]) {
				this.data[c][sc].push(d);
			} else {
				console.warn(
					"⛔ RenderDataStore action",
					this.data[c][sc] + " is not an array. You cannot push() to it!",
				);
			}
		},
		updateCryptoRates(i, r, w) {
			this.data.crypto.data[i].rate = r;
			this.data.crypto.data[i].current_worth = w;
		},
		calculateYield() {
			let currentNetWorth = 0;
			this.data.crypto.data.forEach((i) => {
				currentNetWorth += i.current_worth;
			});

			let yld = getYield(this.data.expenses.meta.sum, currentNetWorth);

			this.data.yield.data = {
				currentNetWorth,
				deposited: this.data.expenses.meta.sum,
				rewarded: this.data.earnings.meta.sum,
				yield: yld.amount,
				yieldInPercentage: yld.percentage,
				earningPercentage: ((100 * this.data.earnings.meta.sum) / yld.amount).toFixed(2),
				estimatedTaxes: yld.amount / 5,
			};
		},
	},
});
