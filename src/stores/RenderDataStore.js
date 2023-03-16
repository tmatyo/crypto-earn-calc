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
                data: [],
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
    actions: { // d = data, c = category, sc = sub category
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
            if('push' in this.data[c][sc]) {
                this.data[c][sc].push(d);
            } else {
                console.warn('⛔ RenderDataStore action', this.data[c][sc] + " is not an array. You cannot push() to it!");
            }
        },
        updateRates(i, r, w) {
            this.data.crypto.data[i].rate = r;
            this.data.crypto.data[i].current_worth = w;
        }
    }
});