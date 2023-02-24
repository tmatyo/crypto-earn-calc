import { defineStore } from 'pinia';

export const useTransactionStore = defineStore ('transactionStore', {
    state: () => ({
        transactions: []
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
            var buyList = [], depositInfo = { count: 0, min: 0, max: 0, avg: 0, sum: 0, minDate: '', maxDate: '', portfolio: [] };

            this.transactions.forEach( (t) => {
                if(t.transaction_description.substring(0,3) == "Buy") {
                    buyList.push({
                        native_amount: t.native_amount,
                        timestamp_utc: t.timestamp_utc
                    });

                    const exists = depositInfo.portfolio.findIndex(i => i.currency == t.currency);

                    if(exists == -1) {
                        depositInfo.portfolio.push({
                            currency: t.currency,
                            amount: t.amount,
                            native_amount: t.native_amount
                        });
                    } else {
                        depositInfo.portfolio[exists].amount += t.amount;
                        depositInfo.portfolio[exists].native_amount += t.native_amount;
                    }
                }
            });
            
            if(buyList.length > 0) {
                buyList.sort((a,b) => a.native_amount - b.native_amount, 0);
                buyList.forEach((i) => depositInfo.sum += i.native_amount);

                depositInfo.count = buyList.length;
                depositInfo.min = buyList[0].native_amount;
                depositInfo.max = buyList[buyList.length-1].native_amount;
                depositInfo.avg = (depositInfo.sum / buyList.length).toFixed(2);
                depositInfo.minDate = buyList[0].timestamp_utc;
                depositInfo.maxDate = buyList[buyList.length-1].timestamp_utc;
            }

            return depositInfo;
        },
        getInvestmentDurationInDays() {
            let ta = this.transactions, days = 0, weeks = 0, years = 0;

            //let lastTransaction = new Date(ta[0].timestamp_utc);
            let firstTransaction = new Date(ta[ta.length-1].timestamp_utc);
            let now = Date.now();

            days = Math.floor((now - firstTransaction) / 1000 / 60 / 60 / 24);
            weeks = Math.floor(days / 7);
            years = Math.floor(days / 364);

            return { days, weeks, years };
        },
        getRewardSum() {
            var sum = 0, byCurrency = [], byType = [];
            
            this.transactions.forEach((t) => {
                if(t.transaction_description.includes("Reward")
                || t.transaction_description == "Crypto Earn"
                || t.transaction_description == "Card Cashback"
                || t.transaction_description.includes("Credit")) {

                    // total sum of rewards received
                    sum += t.native_amount;

                    // total sum of rewards by crypto currency
                    const exists = byCurrency.findIndex(i => i.currency == t.currency);

                    if(exists == -1) {
                        byCurrency.push({
                            currency: t.currency,
                            amount: t.amount,
                            native_amount: t.native_amount
                        });
                    } else {
                        byCurrency[exists].amount += t.amount;
                        byCurrency[exists].native_amount += t.native_amount;
                    }

                    // total sum of rewards by type
                    const type = byType.findIndex(i => i.type == t.transaction_description);

                    if(type == -1) {
                        byType.push({
                            type: t.transaction_description,
                            native_amount: t.native_amount
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

            bought.forEach(b => {
                var index = rewards.findIndex(r => r.currency == b.currency);

                if(index == -1) {
                    rewards.push(b);
                } else {
                    rewards[index].amount += b.amount;
                    rewards[index].native_amount += b.native_amount;
                }
            });

            rewards.forEach(i => sum += i.native_amount);

            return { rewards, sum: sum.toFixed(2), checksum: b.sum + r.sum };
        }
    },
    actions: {
        addTransactions(ta) {
            this.transactions = ta;
        }
    }
})