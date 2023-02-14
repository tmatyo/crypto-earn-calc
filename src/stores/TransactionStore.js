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
            for(var i = 0; i < this.transactions[0].length; i++) {
                if(this.transactions[0][i].transaction_description.includes("buy")) {
                    a = line.native_amount;
                }
            }

            a.sort();
            let sum = a.reduce((a,b) => a + b, 0);

            return {
                count: a.length,
                min: a[0],
                max: a[a.length],
                avg: sum / a.length
            };
        }
    },
    actions: {
        addTransactions(ta) {
            this.transactions.push(ta);
        }
    }
})