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

const submit = () => {
  if (!selectedPart.value) return;
  router.push(`/order/${selectedPart.value}`);
};
</script>

<template>
  <div class="container">
    <h1>Welcome Ga-Olé 卡序表</h1>
    <p>操作最人性化的Gaole卡序表</p>
    <div class="input__wrap">
      <select v-model="selectedPart">
        <option value="" disabled>請選擇</option>
        <option v-for="gen in genList" :key="gen" :value="gen">{{ gen }}</option>
      </select>
      <button @click="submit">
        <v-icon name="ri-send-plane-2-line" scale="1" fill="#676767" />
      </button>
    </div>
    <div class="links">
      <RouterLink to="/manual" target="_blank"
        ><p class="link__title">操作說明</p>
        <p class="link__icon"><v-icon scale="1" name="md-arrowforwardios-round" /></p>
      </RouterLink>
      <RouterLink to="/support" target="_blank"
        ><p class="link__title">支援寶可夢券</p>
        <p class="link__icon"><v-icon scale="1" name="md-arrowforwardios-round" /></p>
      </RouterLink>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  .links {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    width: min(95%, 30rem);
    gap: 0.5rem;

    a {
      flex: 1 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #eaf1fb;
      font-size: 1.25rem;
      text-decoration: none;
      color: #000;
      padding: 1rem 1rem 1rem 1.5rem;
      border-radius: 5rem;
      color: #555;
      overflow: hidden;

      .link__title {
        flex: 1 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .link__icon {
        display: grid;
        place-items: center;
      }

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
