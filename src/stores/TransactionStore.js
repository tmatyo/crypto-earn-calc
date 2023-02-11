import { defineStore } from "pinia";

export const useTransactionStore = defineStore ('transactionStore', {
    state: () => ({
        transactions: []
    }),
    getters: {
        count() {
            return this.transactions.length;
        },
        isEmtpy() {
            return this.transactions.length === 0;
        }
    },
    actions: {
        addTransactions(ta) {
            this.transactions.push(ta);
        }
    }
})