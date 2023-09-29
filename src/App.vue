<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import {useProductStore} from "@/stores/ProductStore.js";
import {useCartStore} from "@/stores/CartStore";
import {storeToRefs} from "pinia";

const productStore = useProductStore();
const {productState} = storeToRefs(productStore);
productStore.fill();

const cartStore = useCartStore();
</script>

<template>
  <div class="container">
    <TheHeader/>
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
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
