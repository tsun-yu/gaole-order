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
      <div
        class="item"
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0.25rem 0.125rem;
  overflow: hidden;
  display: grid;

  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));

  div {
    .item {
      background-color: #fff;
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
      margin-bottom: 0.125rem;
      font-size: 0.5rem;

      width: 2.5rem;
      width: max(2.5rem, 100%);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:first-child {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }

      &:last-child {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }

      &.isStar5 {
        box-shadow: inset 0 0 0 1px #0b57d0;

        &.isSelect {
          background-color: #d2e3fc;
          color: #0b57d0;
          box-shadow: inset 0 0 0 2px #0b57d0;
        }
      }
      &.isStar4 {
        &.isSelect {
          background-color: #d2e3fc;
        }
      }

      &.isStar3 {
        &.isSelect {
          background-color: #c2e7ff;
        }
      }

      &.isSelect {
        background-color: rgba(32, 33, 36, 0.059);
      }
    }
  }
}
</style>
