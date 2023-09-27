import { defineStore } from "pinia";
import {ref} from "vue";

export const useAuthUserStore = defineStore('AuthUserStore', () => {
    const username = ref('vmelnikova');

    return { username };
});