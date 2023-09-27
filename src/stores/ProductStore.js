import { defineStore } from "pinia";
import { ref } from "vue";
import products from "@/data/products.json";

export const useProductStore = defineStore('ProductStore', () => {
    const productState = ref([]);

    function fill() {
        return productState.value = products;
    }

    return {productState, fill};
});