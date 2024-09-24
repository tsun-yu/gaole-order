<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

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
    <h1>Welcome Ga-Olé 卡序表</h1>
    <p>操作最人性化的Gaole卡序表</p>
    <div class="links">
      <RouterLink to="/manual">操作說明</RouterLink>
      <RouterLink to="/support">支援寶可夢</RouterLink>
    </div>
    <div class="input__wrap">
      <select v-model="selectedPart">
        <option v-for="gen in genList" :key="gen" :value="gen">{{ gen }}</option>
      </select>
      <button @click="router.push(`/order/${selectedPart}`)">
        <v-icon name="ri-send-plane-2-line" scale="1" fill="#676767" />
      </button>
    </div>
    <div>
      <v-icon name="pi-venusaur" scale="2" />
      <v-icon name="pi-charizard" scale="2" />
      <v-icon name="pi-blastoise" scale="2" />
    </div>
    <div>
      <v-icon name="pi-meganium" scale="2" />
      <v-icon name="pi-typhlosion" scale="2" />
      <v-icon name="pi-feraligatr" scale="2" />
    </div>
    <div>
      <v-icon name="pi-sceptile" scale="2" />
      <v-icon name="pi-blaziken" scale="2" />
      <v-icon name="pi-swampert" scale="2" />
    </div>
    <div>
      <v-icon name="pi-articuno" scale="2" />
      <v-icon name="pi-zapdos" scale="2" />
      <v-icon name="pi-moltres" scale="2" />
    </div>
    <div>
      <v-icon name="pi-raikou" scale="2" />
      <v-icon name="pi-entei" scale="2" />
      <v-icon name="pi-suicune" scale="2" />
    </div>
    <div>
      <v-icon name="pi-mewtwo" scale="2" />
      <v-icon name="pi-mew" scale="2" />
    </div>
    <v-icon name="pi-dragonite" scale="2" />
    <div>
      <v-icon name="pi-lugia" scale="2" />
      <v-icon name="pi-ho-oh" scale="2" />
    </div>
    <div>
      <v-icon name="pi-regirock" scale="2" />
      <v-icon name="pi-regice" scale="2" />
      <v-icon name="pi-registeel" scale="2" />
    </div>
    <div>
      <v-icon name="pi-latias" scale="2" />
      <v-icon name="pi-latios" scale="2" />
    </div>
    <div>
      <v-icon name="pi-kyogre" scale="2" />
      <v-icon name="pi-groudon" scale="2" />
      <v-icon name="pi-rayquaza" scale="2" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100dvh;

  .links {
    margin-block: 1rem 0.5rem;

    a {
      background-color: #eaf1fb;
      background-color: #d2e3fc;

      font-size: 1.25rem;
      text-decoration: none;
      margin-inline: 0.5rem;
      color: #000;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      color: #0b57d0;

      &:hover {
        background-color: #d2e3fc;
      }
    }
  }

  .input__wrap {
    width: min(95%, 30rem);
    padding: 0.5rem 1rem;
    margin-block: 1rem;
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
