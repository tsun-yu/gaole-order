<script setup>
import { onMounted, ref } from 'vue';

const supportPokemon = ref([]);
const showQrCode = ref(false);
const showImgUrl = ref('');
const qrcodeModal = ref(null);

const getSupportGaole = async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/tsun-yu/gaole-order/contents/src/assets/images/support?ref=develop'
    );
    const data = await response.json();
    supportPokemon.value = data.map(({ name, download_url: url, sha }) => {
      return { name: name.split('.')[0], url, sha };
    });
  } catch (error) {
    console.error(error);
  }
};
const qrcodeToggle = (e) => {
  if (e.target === qrcodeModal.value) showQrCode.value = false;
};

onMounted(() => {
  getSupportGaole();
});
</script>

<template>
  <input type="radio" name="qrcodeToggle" id="qrcodeToggle" v-model="showQrCode" />
  <div class="qrcodeModal" v-show="showQrCode" @click="qrcodeToggle" ref="qrcodeModal">
    <div class="qrcode"><img :src="showImgUrl" alt="" /></div>
  </div>
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
input[type='radio'] {
  display: none;
}
.qrcodeModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 1rem;

  .qrcode {
    background-color: #fff;
    border-radius: 1.5rem;
    margin: auto;
    width: min(80%, 30rem);
    padding: 1rem;

    img {
      width: 100%;
      border-radius: 0.75rem;
    }
  }
}
.container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;

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
