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
            isStar5: item2.name[0] !== 's' && item2.name[0] !== 'c',
            isStar4: item2.name.includes('s4') || item2.name.includes('cp'),
            isStar3: item2.name.includes('s3')
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
    outline: 1px solid #0b57d0;

    &.isSelect {
      background-color: #d2e3fc;
      color: #0b57d0;
    }
  }
  .isStar4 {
    &.isSelect {
      background-color: #c2e7ff;
    }
  }

  .isSelect {
    background-color: rgba(32, 33, 36, 0.059);
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
        background-color: #fff;
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
