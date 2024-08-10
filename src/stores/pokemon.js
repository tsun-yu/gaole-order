import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemon = ref([]);
  const orderList = ref([]);
  async function fetchAllPokemon() {
    const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/2');
    const data = await response.json();
    allPokemon.value = JSON.parse(data.body);
  }
  async function fetchOrderList() {
    const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/1');
    const data = await response.json();
    orderList.value = JSON.parse(data.body);
  }

  return { allPokemon, orderList, fetchAllPokemon, fetchOrderList };
});
