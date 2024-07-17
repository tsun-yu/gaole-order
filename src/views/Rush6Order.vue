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
</script>

<template>
  <div>
    <div class="accordion">
      <label for="star5collapse">⭐⭐⭐⭐⭐</label>
      <input type="checkbox" id="star5collapse" />
      <div class="wrap">
        <multi-select
          :id="'star5Opt'"
          :checkboxOpts="star5"
          v-model:data="hasSelected"
          :optMaxWidth="'10rem'"
        ></multi-select>
      </div>
    </div>
    <div class="accordion">
      <label for="star4collapse">⭐⭐⭐⭐</label>
      <input type="checkbox" id="star4collapse" />
      <div class="wrap">
        <multi-select
          :id="'star4Opt'"
          :checkboxOpts="star4"
          v-model:data="hasSelected"
          :optMaxWidth="'10rem'"
        ></multi-select>
      </div>
    </div>
    <div class="accordion">
      <label for="star3collapse">⭐⭐⭐</label>
      <input type="checkbox" id="star3collapse" />
      <div class="wrap">
        <multi-select
          :id="'star3Opt'"
          :checkboxOpts="star3"
          v-model:data="hasSelected"
          :optMaxWidth="'10rem'"
        ></multi-select>
      </div>
    </div>
    <div class="accordion">
      <label for="star12collapse">⭐ or ⭐⭐</label>
      <input type="checkbox" id="star12collapse" />
      <div class="wrap">
        <multi-select
          :id="'star12Opt'"
          :checkboxOpts="star12"
          v-model:data="hasSelected"
          :optMaxWidth="'10rem'"
        ></multi-select>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-for="(item, i) of orderDisplay" :key="'order' + i">
      <p>{{ i }}</p>
      <ul>
        <li
          :class="{
            isSelect: item2?.selected,
            isStar5: item2.name[0] !== 's' && item2.name[0] !== 'c'
          }"
          v-for="(item2, i2) of item"
          :key="'orderr' + i2"
        >
          {{ item2.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  background-color: #eee;
  margin: 0.5rem;
  border-radius: 1rem;

  label {
    cursor: pointer;
    padding: 1rem;
    display: block;
  }
  input[type='checkbox'] {
    display: none;

    &:checked + .wrap {
      grid-template-rows: 1fr;
    }
  }
  .wrap {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: 0.3s ease-in-out;
  }
}

.container {
  margin-top: 1rem;
  display: flex;
  gap: 0.125rem;
  overflow: auto;

  .isStar5 {
    background-color: var(--color-primary);
    color: var(--color-green6);
  }

  .isSelect {
    background-color: var(--color-teal6);
    color: #fff;
  }

  div {
    flex-shrink: 0;
    p {
      text-align: center;
    }

    ul {
      list-style: none;

      li {
        background-color: var(--color-teal1);
        padding: 0.25rem;
        margin-bottom: 0.125rem;
        overflow: hidden;
        font-size: 0.5rem;

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
}
</style>
