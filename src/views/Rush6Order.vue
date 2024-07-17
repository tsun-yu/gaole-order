<script setup>
import { computed, ref } from 'vue'
import allPokemon from '../assets/allPokemon'
import order from '../assets/order'
import MultiSelect from '../components/form/MultiSelect.vue'

const star5 = ref(allPokemon[0].star5)
const star4 = ref(allPokemon[0].star4)
const star3 = ref(allPokemon[0].star3)
const star12 = ref(allPokemon[0].star12)

const star5Selected = ref([])

const hasSelected = ref([])

const orderDisplay = computed(() => {
  return order
    .map((col) => {
      if (!hasSelected.value.length && !star5Selected.value.length) {
        return col
      }

      if (
        col.filter((item) => {
          if (hasSelected.value.includes(item.name)) {
            item.selected = true
            return true
          }
          item.selected = false
        }).length > 0
      ) {
        return col
      }
      return ''
    })
    .filter((v) => v !== '')
})

// console.log(orderDisplay.value)
</script>

<template>
  <div>
    <div class="wrap">
      <h1>⭐⭐⭐⭐⭐</h1>
      <multi-select
        :id="'star5Opt'"
        :checkboxOpts="star5"
        v-model:data="hasSelected"
        :optMaxWidth="'10rem'"
      ></multi-select>
    </div>
    <div class="wrap">
      <h1>⭐⭐⭐⭐</h1>
      <multi-select
        :id="'star4Opt'"
        :checkboxOpts="star4"
        v-model:data="hasSelected"
        :optMaxWidth="'10rem'"
      ></multi-select>
    </div>
    <div class="wrap">
      <h1>⭐⭐⭐</h1>
      <multi-select
        :id="'star3Opt'"
        :checkboxOpts="star3"
        v-model:data="hasSelected"
        :optMaxWidth="'10rem'"
      ></multi-select>
    </div>
    <div class="wrap">
      <h1>⭐ or ⭐⭐</h1>
      <multi-select
        :id="'star12Opt'"
        :checkboxOpts="star12"
        v-model:data="hasSelected"
        :optMaxWidth="'10rem'"
      ></multi-select>
    </div>
  </div>
  <div class="container">
    <div v-for="(item, i) of orderDisplay" :key="'order' + i">
      <p>{{ i }}</p>
      <ul>
        <li :class="{ isSelect: item2?.selected }" v-for="(item2, i2) of item" :key="'orderr' + i2">
          {{ item2.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));

  .isSelect {
    background-color: var(--color-teal6);
    color: #fff;
  }

  p {
    text-align: center;
  }

  ul {
    list-style: none;

    li {
      background-color: var(--color-teal1);
      padding: 0.5rem 1rem;
      margin-bottom: 0.125rem;

      &:first-child {
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }

      &:last-child {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }
    }
  }
}
</style>
