<script setup>
import { computed, ref } from 'vue';
import orderList from '@/assets/order';
import FilterComponent from '@/components/FilterComponent.vue';

const hasSelected = ref([]);
const hasSelectedSorted = computed(() => [...hasSelected.value].sort());

const orderDisplay = computed(() => {
  const orderListClone = JSON.parse(JSON.stringify(orderList));
  if (!hasSelected.value.length) {
    return orderList.map((col) => col.order);
  }
  let orderListFiltered = orderListClone.reduce((acc, col) => {
    const filteredItems = col.order.filter((item) => {
      item.selected = hasSelected.value.includes(item.name);
      return item.selected;
    });

    if (!filteredItems.length) return acc;

    col.count = filteredItems.reduce((acc, item) => {
      if (item.name[0] !== 's' && item.name[0] !== 'c') return acc + 100;
      if (item.name.includes('s4') || item.name.includes('cp')) return acc + 10;
      if (item.name.includes('s3')) return acc + 1;
      return acc;
    }, 0);

    return [...acc, col].sort((a, b) => b.count - a.count);
  }, []);

  return orderListFiltered.map((item) => item.order);
});
</script>

<template>
  <FilterComponent v-model:data="hasSelected"></FilterComponent>
  <div class="selected" v-show="!!hasSelected.length">
    <label class="selected__item" v-for="item of hasSelectedSorted" :key="item" :for="item">
      <input type="checkbox" :name="item" :id="item" v-model="hasSelected" :value="item" />
      <v-icon name="pr-times" scale="1" fill="#676767" />{{ item }}
    </label>
  </div>
  <div class="orderList">
    <div v-for="(item, i) of orderDisplay" :key="'order' + i">
      <div
        class="orderList__item"
        :class="{
          'orderList__item--selected': item2?.selected,
          'orderList__item--star5': item2.name[0] !== 's' && item2.name[0] !== 'c',
          'orderList__item--star4': item2.name.includes('s4') || item2.name.includes('cp'),
          'orderList__item--star3': item2.name.includes('s3')
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
.selected {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-inline: 0.125rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #edf2fa;
  position: sticky;
  top: 0;
  z-index: 1;
  /*   box-shadow:
    0 4px 8px 3px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.3); */

  .selected__item {
    padding: 0.125rem 0.25rem 0.125rem 0;
    border-radius: 0.25rem;
    color: #676767;
    border: 1px solid #676767;
    font-size: 1rem;
    cursor: pointer;

    input[type='checkbox'] {
      display: none;
    }
  }
}
.orderList {
  padding: 0.25rem 0.125rem;
  overflow: hidden;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));

  div {
    .orderList__item {
      background-color: #fff;
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
      margin-bottom: 0.125rem;
      font-size: min(2vw, 1rem);

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

      &.orderList__item--star5 {
        box-shadow: inset 0 0 0 1px #0b57d0;

        &.orderList__item--selected {
          background-color: #d2e3fc;
          color: #0b57d0;
          box-shadow: inset 0 0 0 2px #0b57d0;
        }
      }
      &.orderList__item--star4 {
        &.orderList__item--selected {
          background-color: #d2e3fc;
        }
      }

      &.orderList__item--star3 {
        &.orderList__item--selected {
          background-color: #c2e7ff;
        }
      }

      &.orderList__item--selected {
        background-color: rgba(32, 33, 36, 0.059);
      }
    }
  }
}
</style>
