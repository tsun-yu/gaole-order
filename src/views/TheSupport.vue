<script setup>
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';

defineProps({
  bgColor: {
    type: String,
    default: '#f6f8fc;'
  }
});

const store = usePokemonStore();

const supportPokemon = ref([]);
const showQrCode = ref(false);
const showImgUrl = ref('');
const qrcodeOutside = ref(null);

const qrcodeToggle = (e) => {
  if (e.target === qrcodeOutside.value) showQrCode.value = false;
};

onMounted(async () => {
  if (!store.supportPokemon.length) await store.fetchSupportPokemon();
  supportPokemon.value = store.supportPokemon;
});
</script>

<template>
  <input type="checkbox" name="qrcodeToggle" id="qrcodeToggle" v-model="showQrCode" />
  <div class="qrcode"><img :src="showImgUrl" alt="" /></div>
  <div class="qrcodeOutside" @click="qrcodeToggle" ref="qrcodeOutside"></div>
  <div class="container">
    <label
      class="support"
      for="qrcodeToggle"
      @click="showImgUrl = pokemon.url"
      v-for="pokemon of supportPokemon"
      :key="pokemon.sha"
    >
      {{ pokemon.name }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
input[type='checkbox'] {
  display: none;

  &:checked {
    & ~ .qrcodeOutside {
      display: block;
    }
    & ~ .qrcode {
      top: 1rem;
    }
  }
}
.qrcodeOutside {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 1rem;
  z-index: 11;
}
.qrcode {
  background-color: #fff;
  border-radius: 1.5rem;
  margin: auto;
  width: min(80%, 30rem);
  aspect-ratio: 9/10;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: fixed;
  top: max(-90vh, -34rem);
  transition: top 0.3s ease-in-out;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    object-fit: cover;
  }
}

.container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 0.5rem;
  background-color: v-bind(bgColor);
  border-radius: 1rem;

  .support {
    font-size: 1.5rem;
    padding: 1rem;
    background-color: #eaf1fb;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background-color: #d2e3fc;
    }
  }
}
</style>
