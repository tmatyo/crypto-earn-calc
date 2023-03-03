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
                bought: [],
                free: []
            },
            yield: {
                meta: {},
                data: []
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
        update(type, data) {
            this.data[type] = data;
        },
        pushTo(type, data) {
            this.data[type].data.push(data);
        }
    }
});