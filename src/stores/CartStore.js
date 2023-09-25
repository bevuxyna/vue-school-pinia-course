import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore', {
    state: () => ({
        items: []
    }),
    actions: {
        addItem(count, item){
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
               this.items.push({ ...item });
            }

        }
    }
});