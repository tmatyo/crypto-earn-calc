import { defineStore } from "pinia";

export const useRenderDataStore = defineStore('renderDataStore', {
    state: () => ({
        data: {
            expenses: {
                meta: {},
                data: []
            },
            earnings: {
                meta: {},
                data: [],
            },
            yield: {
                meta: {},
                data: []
            },
            crypto: {
                meta: {},
                bought: [],
                free: []
            }
        }
    }),
    getters: {
        isEmpty: s => Object.keys(s.data).length == 0,
        getExpenses: s => s.data.expenses.data,
        getEarnings: s => s.data.earnings.data,
        getYield: s => s.data.yield.data
    },
    actions: {
        updateAll(a) {
            this.data = a;
        },
        update(c, sc, d) {
            this.data[c][sc] = d;
        },
        pushTo(c, sc, d) {
            this.data[c][sc].push(d);
        }
    }
});