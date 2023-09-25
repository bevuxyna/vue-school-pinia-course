import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore('CartStore', {
    state: () => ({
        items: []
    }),
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((previous, current) => previous + current.price, 0),
    },
    actions: {
        addItem(count, item){
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
               this.items.push({ ...item });
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter(item => item.name !== itemName);
        }
    }
});