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
  <div class="container">
    <div class="input__wrap">
      <select v-model="selectedPart">
        <option v-for="gen in genList" :key="gen" :value="gen">{{ gen }}</option>
      </select>
      <button @click="router.push(`/order/${selectedPart}`)">
        <v-icon name="ri-send-plane-2-line" scale="1" fill="#676767" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  .input__wrap {
    width: min(95%, 30rem);
    padding: 0.5rem 1rem;
    margin: auto;
    border-radius: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: #eaf1fb;

    select {
      border: none;
      height: 3rem;
      padding-inline: 1.5rem;
      font-size: 1.25rem;
      color: #555;
      background-color: #eaf1fb;
      border: none;
      flex: 1 1;
      border-radius: 1.5rem;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      option {
        background-color: #fff;
      }
    }

    button {
      flex: 0 0 2.75rem;
      height: 2.75rem;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      background-color: #eaf1fb;
      font-size: 1rem;
      color: #555;
      display: grid;
      place-items: center;

      &:hover {
        background-image: linear-gradient(#0000001a, #0000001a);
      }
    }
  }
}
</style>
