import { defineStore } from "pinia";
import { updateRates } from "../utils/ExchangeRates";
import { getStats } from "../utils/Calculator";
import { useExchangeRateStore } from "./ExchangeRateStore";
import { useRenderDataStore } from "./RenderDataStore";

export const useTransactionStore = defineStore("transactionStore", {
	state: () => ({
		transactions: [],
		files: [],
	}),
	getters: {
		isEmpty() {
			return this.transactions.length === 0;
		},
		getCount() {
			return this.transactions.length;
		},
		getNativeCurrency() {
			return this.transactions[0].native_currency;
		},
		getDepositInfo() {
			var buyList = [],
				depositInfo = { count: 0, min: 0, max: 0, avg: 0, sum: 0, minDate: "", maxDate: "", portfolio: [] };

			this.transactions.forEach((t) => {
				if (t.transaction_description.substring(0, 3) == "Buy") {
					buyList.push({
						native_amount: t.native_amount,
						timestamp_utc: t.timestamp_utc,
					});

					const exists = depositInfo.portfolio.findIndex((i) => i.currency == t.currency);

					if (exists == -1) {
						depositInfo.portfolio.push({
							currency: t.currency,
							amount: t.amount,
							native_amount: t.native_amount,
						});
					} else {
						depositInfo.portfolio[exists].amount += t.amount;
						depositInfo.portfolio[exists].native_amount += t.native_amount;
					}
				}
			});

			if (buyList.length > 0) {
				buyList.sort((a, b) => a.native_amount - b.native_amount, 0);
				buyList.forEach((i) => (depositInfo.sum += i.native_amount));

				depositInfo.count = buyList.length;
				depositInfo.min = buyList[0].native_amount;
				depositInfo.max = buyList[buyList.length - 1].native_amount;
				depositInfo.avg = (depositInfo.sum / buyList.length).toFixed(2);
				depositInfo.minDate = buyList[0].timestamp_utc;
				depositInfo.maxDate = buyList[buyList.length - 1].timestamp_utc;
			}

			return depositInfo;
		},
		getInvestmentDuration() {
			let ta = this.transactions,
				days = 0,
				weeks = 0,
				years = 0;

			//let lastTransaction = new Date(ta[0].timestamp_utc);
			let firstTransaction = new Date(ta[ta.length - 1].timestamp_utc);
			let now = Date.now();

			days = Math.floor((now - firstTransaction) / 1000 / 60 / 60 / 24);
			weeks = Math.floor(days / 7);
			years = Math.floor(days / 364);

			return { days, weeks, years };
		},
		getRewardSum() {
			var sum = 0,
				byCurrency = [],
				byType = [];

			this.transactions.forEach((t) => {
				if (
					t.transaction_description.includes("Reward") ||
					t.transaction_description == "Crypto Earn" ||
					t.transaction_description == "Card Cashback" ||
					t.transaction_description.includes("Credit")
				) {
					// total sum of rewards received
					sum += t.native_amount;

					// total sum of rewards by crypto currency
					const exists = byCurrency.findIndex((i) => i.currency == t.currency);

					if (exists == -1) {
						byCurrency.push({
							currency: t.currency,
							amount: t.amount,
							native_amount: t.native_amount,
						});
					} else {
						byCurrency[exists].amount += t.amount;
						byCurrency[exists].native_amount += t.native_amount;
					}

					// total sum of rewards by type
					const type = byType.findIndex((i) => i.type == t.transaction_description);

					if (type == -1) {
						byType.push({
							type: t.transaction_description,
							native_amount: t.native_amount,
						});
					} else {
						byType[type].native_amount += t.native_amount;
					}
				}
			});

			return { byCurrency, byType, sum: sum.toFixed(2) };
		},
		getAllCoins() {
			// removing reactivity, because f you, thats why
			var b = JSON.parse(JSON.stringify(this.getDepositInfo));
			var bought = b.portfolio;
			var r = JSON.parse(JSON.stringify(this.getRewardSum));
			var rewards = r.byCurrency;

			var sum = 0;

			bought.forEach((b) => {
				var index = rewards.findIndex((r) => r.currency == b.currency);

				if (index == -1) {
					rewards.push(b);
				} else {
					rewards[index].amount += b.amount;
					rewards[index].native_amount += b.native_amount;
				}
			});

			rewards.forEach((i) => {
				sum += i.native_amount;
				console.log("🧐 Iteration:", i);
				//getRate(i.currency, this.getNativeCurrency);
			});

			let er = useExchangeRateStore();
			console.log(er.exchangeRates);

			return { rewards, sum: sum.toFixed(2), checksum: b.sum + r.sum };
		},
	},
	actions: {
		addTransactions(transactionList) {
			this.transactions = transactionList;
			this.sortItOut();
		},
		addFile(file) {
			this.files.push(file);
		},
		sortItOut() {
			var buyList = [],
				rewardsList = [],
				portfolio = [],
				byCurrency = [],
				byType = [];
			const rd = useRenderDataStore();

			this.transactions.forEach((t) => {
				// calculate expenses
				if (t.transaction_description.substring(0, 3) == "Buy") {
					// for the stats
					buyList.push({
						// meta
						timestamp_utc: t.timestamp_utc,
						transaction_description: t.transaction_description,
						// crypto
						currency: t.currency,
						amount: t.amount,
						// fiat
						native_currency: t.native_currency,
						native_amount: t.native_amount,
					});

					// add crypto to portfolio
					const existsExp = portfolio.findIndex((i) => i.currency == t.currency);

					if (existsExp == -1) {
						// doesnt exist? create new entry in portfolio
						portfolio.push({
							currency: t.currency,
							amount: t.amount,
							native_currency: t.native_currency,
							native_amount: t.native_amount,
						});
					} else {
						// already exists? increment amount of this crypto in portfolio
						portfolio[existsExp].amount += t.amount;
						portfolio[existsExp].native_amount += t.native_amount;
					}
				}

				// calculate rewards
				if (
					t.transaction_description.includes("Reward") ||
					t.transaction_description.includes("Credit") ||
					t.transaction_description == "Crypto Earn" ||
					t.transaction_description == "Card Cashback"
				) {
					// for the stats
					rewardsList.push({
						// meta
						timestamp_utc: t.timestamp_utc,
						transaction_description: t.transaction_description,
						// crypto
						currency: t.currency,
						amount: t.amount,
						// fiat
						native_currency: t.native_currency,
						native_amount: t.native_amount,
					});

					// total sum of rewards by crypto currency
					const existsEar = byCurrency.findIndex((i) => i.currency == t.currency);

					if (existsEar == -1) {
						byCurrency.push({
							currency: t.currency,
							amount: t.amount,
							native_currency: t.native_currency,
							native_amount: t.native_amount,
						});
					} else {
						byCurrency[existsEar].amount += t.amount;
						byCurrency[existsEar].native_amount += t.native_amount;
					}

					// total sum of rewards by type
					const existsByType = byType.findIndex(
						(i) => i.transaction_description == t.transaction_description,
					);

					if (existsByType == -1) {
						byType.push({
							transaction_description: t.transaction_description,
							native_currency: t.native_currency,
							native_amount: t.native_amount,
						});
					} else {
						byType[existsByType].native_amount += t.native_amount;
					}
				}
			});

			if (buyList.length > 0) {
				// calculating all the analytics
				let depositInfo = getStats(buyList);

				// save all info
				rd.update("expenses", "meta", depositInfo);
				rd.update("expenses", "data", buyList);

				// update list of users crypto currencies
				rd.update("crypto", "bought", portfolio);
			}

			if (rewardsList.length > 0) {
				let rewardsInfo = getStats(rewardsList);

				rd.update("earnings", "meta", rewardsInfo);
				rd.update("earnings", "data", rewardsList);
				rd.update("earnings", "byType", byType);

				// save earned crypto info
				rd.update("crypto", "free", byCurrency);
			}

			// merge arrays of bought and rewarded crypto & breaking reactivity, so data stores are not affected
			let crpt = JSON.parse(JSON.stringify([...portfolio, ...byCurrency]));
			var crptAll = [];

			// counting aprox net worth, this will be compared to real data after ajax calls
			var aproxNetWorth = 0;
			let assetStringList = [];

			crpt.forEach((p) => {
				aproxNetWorth += p.native_amount;
				assetStringList.push(p.currency);

				var i = crptAll.findIndex((b) => b.currency == p.currency);

				if (i == -1) {
					crptAll.push(p);
				} else {
					crptAll[i].amount += p.amount;
					crptAll[i].native_amount += p.native_amount;
				}
			});

			// save list of all crypto
			rd.update("crypto", "data", crptAll);
			rd.update("crypto", "meta", { aprox_net_worth: aproxNetWorth });

			updateRates([...new Set(assetStringList)].toString());
		},
	},
});
