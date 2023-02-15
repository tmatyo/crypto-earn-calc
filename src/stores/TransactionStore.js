import { defineStore } from "pinia";

export const useTransactionStore = defineStore ('transactionStore', {
    state: () => ({
        transactions: []
    }),
    getters: {
        getCount() {
            return this.transactions[0].length;
        },
        isEmpty() {
            return this.transactions.length === 0;
        },
        getNativeCurrency() {
            return this.transactions[0][0].native_currency;
        },
        getDepositInfo() {
            var a = [];
            var b = {
                count: 0,
                min: 0,
                max: 0,
                avg: 0,
                sum: 0
            }

            this.transactions[0].forEach( (t) => {
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
        }
    },
    actions: {
        addTransactions(ta) {
            this.transactions.push(ta);
        }
    }
})