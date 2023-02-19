import { defineStore } from "pinia";

export const useTransactionStore = defineStore ('transactionStore', {
    state: () => ({
        transactions: []
    }),
    getters: {
        getCount() {
            return this.transactions.length;
        },
        isEmpty() {
            return this.transactions.length === 0;
        },
        getNativeCurrency() {
            return this.transactions[0].native_currency;
        },
        getDepositInfo() {
            var a = [];
            var b = { count: 0, min: 0, max: 0, avg: 0, sum: 0 };

            this.transactions.forEach( (t) => {
                if(t.transaction_description.substring(0,3) == "Buy") {
                    a.push(t.native_amount);
                }
            });

            if(a.length > 0) {
                a.sort((a,b) => a - b, 0);
                let sum = a.reduce((a,b) => a + b, 0);
                let c = this.getNativeCurrency;

                b.count = a.length;
                b.min = a[0] + " " + c;
                b.max = a[a.length-1] + " " + c;
                b.avg = (sum / a.length).toFixed(2) + " " + c;
                b.sum = sum + " " + c;
            }

            return b;
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
                        })
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
        }
    },
    actions: {
        addTransactions(ta) {
            this.transactions = ta;
        }
    }
})