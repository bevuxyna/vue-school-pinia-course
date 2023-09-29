<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore.js";
import { useCartStore } from "@/stores/CartStore";
import { storeToRefs } from "pinia";
import {reactive, ref} from "vue";

const productStore = useProductStore();
const { productState } = storeToRefs(productStore);
productStore.fill();

const cartStore = useCartStore();
const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push((JSON.stringify(cartStore.$state)));
const  redo = () => {
  const latestState = future.pop();
  if (!latestState) {
    return;
  }
  doingHistory.value = true;
  history.push(latestState);
  cartStore.$state = JSON.parse(latestState);
  doingHistory.value = false;
}
const undo = () => {
  if (history.length === 1) {
    return;
  }
  doingHistory.value = true;
  future.push(history.pop());
  history.pop();
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
}
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.slice(0, future.length);
  }
})
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productState"
        :key="product.name"
        :product="product"
        @add-to-cart="cartStore.addItem($event, product)"
      />
    </ul>
  </div>
</template>
