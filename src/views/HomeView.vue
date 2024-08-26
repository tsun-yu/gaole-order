<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = usePokemonStore();
const router = useRouter();
const genList = computed(() => {
  if (!store.allPokemon) return [];
  return Object.keys(store.allPokemon).map((key) => {
    return key;
  });
});
const selectedPart = ref('');
</script>

<template>
  <div class="input__container">
    <select v-model="selectedPart">
      <option v-for="gen in genList" :key="gen" :value="gen">{{ gen }}</option>
    </select>
    <button @click="router.push(`/order/${selectedPart}`)">GO</button>
  </div>
</template>

<style lang="scss" scoped>
.input__container {
  width: 100%;
  flex: 0 0 4rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-inline: 1rem;
  margin-top: 10rem;

  select {
    border: none;
    height: 2.75rem;
    padding-inline: 1.5rem;
    font-size: 1.25rem;
    color: #555;
    background-color: #eaf1fb;
    border: none;
    flex: 0 1 min(100%, 30rem);
    border-radius: 1.5rem;

    &::placeholder {
      color: #ccc;
    }
  }

  button {
    flex: 0 0 2.75rem;
    height: 2.75rem;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    background-color: #c4eed0;
    font-size: 1rem;
    color: #555;
    display: grid;
    place-items: center;

    &:active {
      background-color: #bce1c7;
    }
  }
}
</style>
