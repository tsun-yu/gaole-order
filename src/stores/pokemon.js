import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemon = ref([]);
  const orderList = ref([]);
  const supportPokemon = ref([]);
  async function fetchAllPokemon() {
    try {
      const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/2');

      if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      allPokemon.value = JSON.parse(data.body);
    } catch (err) {
      console.error('all pokemon error', err);
    }
  }
  async function fetchOrderList() {
    try {
      const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/1');

      if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      orderList.value = JSON.parse(data.body);
    } catch (err) {
      console.error('pokemon order error', err);
    }
  }
  async function fetchSupportPokemon() {
    try {
      const response = await fetch(
        'https://api.github.com/repos/tsun-yu/gaole-order/contents/src/assets/images/support?ref=develop'
      );

      if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      supportPokemon.value = data.map(({ name, download_url: url, sha }) => {
        return { name: name.split('.')[0], url, sha };
      });
    } catch (err) {
      console.error('support error', err);
    }
  }

  return {
    allPokemon,
    orderList,
    supportPokemon,
    fetchAllPokemon,
    fetchOrderList,
    fetchSupportPokemon
  };
});
