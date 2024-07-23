<script setup>
import { computed, ref } from 'vue'
import order from '../assets/order'
import FilterComponent from '@/components/FilterComponent.vue'

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
  <FilterComponent v-model:data="hasSelected"></FilterComponent>
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
