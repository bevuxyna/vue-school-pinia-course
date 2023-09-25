import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore', {
    state: () => ({
        items: []
    }),
    getters: {
        count() {
            return this.items.length;
        },
        isEmpty() {
            return this.count === 0;
        }

    },
    actions: {
        addItem(count, item){
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
               this.items.push({ ...item });
            }

        }
    }
});