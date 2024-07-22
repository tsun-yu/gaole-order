<script setup>
import { computed, onMounted, ref } from 'vue'
import allPokemon from '../assets/allPokemon'
import order from '../assets/order'
import MultiSelect from '../components/form/MultiSelect.vue'

const star5 = ref(allPokemon[0].star5)
const star4 = ref(allPokemon[0].star4)
const star3 = ref(allPokemon[0].star3)
const star12 = ref(allPokemon[0].star12)

const star5Selected = ref([])
const filterBtn = ref(null)
const filterBtnLeft = ref('0')
const filterBtnTop = ref('5rem')
const filterBtnTransition = ref('0s')
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

onMounted(() => {
  filterBtn.value.addEventListener('touchmove', (e) => {
    filterBtnTransition.value = '0s'
    filterBtnLeft.value = e.touches[0].clientX + 'px'
    filterBtnTop.value = e.touches[0].clientY + 'px'
    e.preventDefault()
  })

  filterBtn.value.addEventListener('touchend', (e) => {
    const btnW = filterBtn.value.clientWidth
    filterBtnTransition.value = '0.2s ease-in-out'

    if (e.changedTouches[0].clientX >= window.innerWidth / 2) {
      filterBtnLeft.value = window.innerWidth - btnW + 'px'
    } else {
      filterBtnLeft.value = '0px'
    }
  })
})
</script>

<template>
  <div class="filter">
    <input type="checkbox" name="accordion" id="accordion" />
    <label class="filterBtn" ref="filterBtn" for="accordion"
      ><v-icon name="hi-solid-filter" scale="2" fill="#0b57d0"
    /></label>
    <div class="filterOpts">
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
.filter {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;

  .filterBtn {
    width: 4rem;
    height: 4rem;
    background-color: #d2e3fc;
    position: fixed;
    top: v-bind(filterBtnTop);
    left: v-bind(filterBtnLeft);
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: v-bind(filterBtnTransition);
  }
  #accordion {
    display: none;

    &:checked ~ .filterOpts {
      display: block;
    }
    &:checked ~ .filterBtn {
      // top: 0.5rem !important;
    }
  }
  .filterOpts {
    display: none;
    width: 95%;
    padding: 0.5rem;
    border-radius: 1.5rem;
    margin-top: 1rem;
    background-color: #e9eef6;
    box-shadow:
      0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);

    .accordion {
      background-color: #fff;
      margin: 0.25rem;
      border-radius: 0.5rem;

      &:first-child {
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
      }
      &:last-child {
        border-bottom-left-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;
      }

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

    &.isSelect {
      background-color: var(--color-blue6);
    }
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:first-child {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      }
    }
  }
}
</style>
