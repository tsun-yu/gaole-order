<script setup>
import { computed, ref, watchEffect } from 'vue';
import orderList from '@/assets/order';
import FilterComponent from '@/components/FilterComponent.vue';
import MagnifySelected from '@/components/MagnifySelected.vue';

const hasSelected = ref([]);
const hasSelectedSorted = computed(() => {
  if (!isSelectedCol.value.length) {
    return [...hasSelected.value]
      .map((item) => ({ name: item, isInCol: false }))
      .sort((a, b) => {
        return b.name > a.name ? -1 : 1;
      });
  }

  const itemInSelectedCol = [...hasSelected.value].map((item) => {
    const isInCol = isSelectedCol.value.some((colId) =>
      orderList[colId - 1].order.some((item2) => item2.name === item)
    );
    return { name: item, isInCol };
  });

  return itemInSelectedCol.sort((a, b) => {
    return b.name > a.name ? -1 : 1;
  });
});

const isSelectedCol = ref([]);
const magnifySelectedShow = ref(false);
watchEffect(() => {
  if (!isSelectedCol.value.length) {
    magnifySelectedShow.value = false;
  }
});
const orderDisplay = computed(() => {
  const orderListClone = JSON.parse(JSON.stringify(orderList));
  if (!hasSelected.value.length) {
    return orderListClone;
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

  return orderListFiltered.map((item) => {
    return { order: item.order, id: item.id };
  });
});
</script>

<template>
  <filter-component v-model:data="hasSelected"></filter-component>
  <magnify-selected
    v-if="magnifySelectedShow"
    v-model:isSelectedCol="isSelectedCol"
    :orderDisplay="orderDisplay"
    :orderList="orderList"
  ></magnify-selected>
  <div class="selected" v-show="!!hasSelected.length">
    <label
      class="selected__item"
      :class="{ 'selected__item--isInCol': item.isInCol }"
      v-for="item of hasSelectedSorted"
      :key="item.name"
      :for="item.name"
    >
      <input
        type="checkbox"
        :name="item.name"
        :id="item.name"
        v-model="hasSelected"
        :value="item.name"
      />
      <v-icon name="pr-times" scale="1" fill="#676767" />{{ item.name }}
    </label>
  </div>
  <div class="orderList">
    <div v-for="item of orderDisplay" :key="'order' + item.id" class="orderList__col">
      <input
        type="checkbox"
        :name="'column' + item.id"
        :id="'column' + item.id"
        :value="item.id"
        v-model="isSelectedCol"
      />
      <label :for="'column' + item.id" class="orderList__selectBtn">
        <v-icon name="md-checkcircle" scale="1" fill="#d1d6d4" />
      </label>
      <div class="orderList__wrap">
        <div
          class="orderList__item"
          :class="{
            'orderList__item--selected': item2?.selected,
            'orderList__item--star5': item2.name[0] !== 's' && item2.name[0] !== 'c',
            'orderList__item--star4': item2.name.includes('s4') || item2.name.includes('cp'),
            'orderList__item--star3': item2.name.includes('s3')
          }"
          v-for="(item2, i2) of item.order"
          :key="'orderr' + i2"
        >
          {{ item2.name }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="doneBtn"
    v-show="isSelectedCol.length >= 2 && !magnifySelectedShow"
    @click="magnifySelectedShow = !magnifySelectedShow"
  >
    <v-icon name="md-zoomoutmap-round" scale="1" fill="#0b57d0" />Select
  </div>
  <div
    class="doneBtn"
    v-show="isSelectedCol.length >= 1 && magnifySelectedShow"
    @click="magnifySelectedShow = !magnifySelectedShow"
  >
    <v-icon name="md-zoominmap-round" scale="1" fill="#0b57d0" />Close
  </div>
</template>

<style lang="scss" scoped>
.selected {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: #edf2fa;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 8px;

  .selected__item {
    padding: 0.125rem 0.25rem 0.125rem 0;
    border-radius: 0.375rem;
    color: #676767;
    border: 1px solid #676767;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    input[type='checkbox'] {
      display: none;
    }
  }

  .selected__item--isInCol {
    background-color: #d2e3fc;
    border-color: #d2e3fc;
  }
}
.orderList {
  padding: 0.25rem 0.125rem;
  margin-top: 0.5rem;
  overflow: hidden;
  display: grid;
  gap: 0.1875rem;
  grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));

  .orderList__col {
    box-shadow: 0 0 0 1px #d1d6d4;
    border-radius: 0.625rem;
    overflow: hidden;

    &:has(input:checked) {
      box-shadow: 0 0 0 1px #0b57d0;
    }

    input[type='checkbox'] {
      display: none;

      &:checked ~ .orderList__selectBtn {
        background-color: #0b57d0;

        svg {
          fill: #f6f8fc;
        }
      }
    }

    .orderList__selectBtn {
      display: grid;
      place-items: center;
      cursor: pointer;
      margin-bottom: 0.125rem;
      padding: 0.25rem 0.5rem;
    }
    .orderList__wrap {
      padding-inline: 1px;

      .orderList__item {
        background-color: #fff;
        padding: 0.125rem 0.25rem;
        border-radius: 0.125rem;
        margin-bottom: 0.125rem;
        font-size: min(2vw, 1rem);
        width: max(2.5rem, 100%);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:first-of-type {
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
}
.doneBtn {
  position: fixed;
  z-index: 997;
  bottom: 2rem;
  right: 0.5rem;
  background-color: #d2e3fc;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  box-shadow:
    0 4px 8px 3px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.3);
  color: #0b57d0;
  cursor: pointer;
  font-size: 1.125rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 1rem;
  }
}
</style>
