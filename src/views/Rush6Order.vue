<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
// import orderList from '@/assets/order';
import FilterComponent from '@/components/FilterComponent.vue';
import MagnifySelected from '@/components/MagnifySelected.vue';

const orderList = ref([]);
const orderListWrap = ref(null);
const hasSelected = ref([]);
const hasSelectedSorted = computed(() => {
  const itemClickedCheckList = [...hasSelected.value].map((item) => {
    const isClicked = selectedItemClick.value.some((itemClicked) => itemClicked.includes(item));
    return { name: item, isClicked };
  });

  if (!isSelectedCol.value.length) {
    return itemClickedCheckList
      .map((item) => ({ ...item, isInCol: false }))
      .sort((a, b) => {
        return b.name > a.name ? -1 : 1;
      });
  }

  const itemInSelectedCol = itemClickedCheckList.map((itemCheck) => {
    const isInCol = isSelectedCol.value.some((colId) =>
      orderList.value[colId - 1].order.some((itemOriginal) => itemOriginal.name === itemCheck.name)
    );
    return { ...itemCheck, isInCol };
  });

  return itemInSelectedCol.sort((a, b) => {
    return b.name > a.name ? -1 : 1;
  });
});
const selectedItemClick = ref([]);
const isSelectedCol = ref([]);
const magnifySelectedShow = ref(false);
watchEffect(() => {
  if (!isSelectedCol.value.length) {
    magnifySelectedShow.value = false;
  }
});
const orderDisplay = computed(() => {
  const orderListClone = JSON.parse(JSON.stringify(orderList.value));
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
      if (item.name[0] !== 's') return acc + 10;
      if (item.name.includes('s4') || item.name.includes('s3')) return acc + 2;
      return acc + 1;
    }, 0);

    return [...acc, col].sort((a, b) => b.count - a.count);
  }, []);

  return orderListFiltered.map((item) => {
    return { order: item.order, id: item.id };
  });
});
const btnContentWidth = ref('1fr');

const getOrder = async () => {
  const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/1');
  const data = await response.json();
  orderList.value = JSON.parse(data.body).rush6;
};

const getAllPokemon = async () => {
  const response = await fetch('https://api.github.com/repos/tsun-yu/gaole-order/issues/2');
  const data = await response.json();
  console.log('data', JSON.parse(data.body).rush6);
};
onMounted(async () => {
  await getOrder();
  await getAllPokemon();
  window.addEventListener('scroll', () => {
    const canScroll = orderListWrap.value.clientHeight - window.innerHeight;

    if (window.scrollY > canScroll / 2) {
      btnContentWidth.value = '0fr';
      return;
    }

    btnContentWidth.value = '1fr';
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
      :class="{
        'selected__item--isInCol': item.isInCol,
        'selected__item--isClicked': item.isClicked
      }"
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
  <div class="orderList" ref="orderListWrap">
    <div v-for="col of orderDisplay" :key="'order' + col.id" class="orderList__col">
      <input
        class="orderList__selectCol"
        type="checkbox"
        :name="'column' + col.id"
        :id="'column' + col.id"
        :value="col.id"
        v-model="isSelectedCol"
      />
      <label :for="'column' + col.id" class="orderList__selectBtn">
        <v-icon name="md-checkcircle" scale="1" fill="#d1d6d4" />
      </label>
      <div class="orderList__wrap">
        <label
          class="orderList__item"
          :class="{
            'orderList__item--selected': item?.selected,
            'orderList__item--star5': item.name[0] !== 's',
            'orderList__item--star4': item.name.includes('s4'),
            'orderList__item--star3': item.name.includes('s3')
          }"
          v-for="(item, i) of col.order"
          :key="'column' + col.id + i"
          :for="'column' + col.id + i"
        >
          <input
            type="checkbox"
            :id="'column' + col.id + i"
            :name="'column' + col.id + i"
            :value="item.name + col.id + i"
            v-model="selectedItemClick"
          />
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
  <div class="btnGroup">
    <div
      class="btnGroup__btn"
      v-show="!!selectedItemClick.length && !magnifySelectedShow"
      @click="selectedItemClick.length = 0"
    >
      <div class="btnGroup__icon"><v-icon name="md-refresh-round" scale="1" fill="#0b57d0" /></div>
      <div class="btnGroup__content"><p>Reset</p></div>
    </div>
    <div
      class="btnGroup__btn"
      v-show="isSelectedCol.length >= 2 && !magnifySelectedShow"
      @click="magnifySelectedShow = true"
    >
      <div class="btnGroup__icon">
        <v-icon name="md-zoomoutmap-round" scale="1" fill="#0b57d0" />
      </div>
      <div class="btnGroup__content"><p>Select</p></div>
    </div>
    <div
      class="btnGroup__btn"
      v-show="isSelectedCol.length >= 1 && magnifySelectedShow"
      @click="magnifySelectedShow = false"
    >
      <div class="btnGroup__icon">
        <v-icon name="md-zoominmap-round" scale="1" fill="#0b57d0" />
      </div>
      <div class="btnGroup__content"><p>Close</p></div>
    </div>
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
  .selected__item--isClicked {
    border-color: #0b57d0;
    color: #0b57d0;

    svg {
      fill: #0b57d0;
    }

    &.selected__item--isInCol {
      background-color: #d2e3fc;
    }
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

    &:has(.orderList__selectCol:checked) {
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
        display: block;
        cursor: pointer;

        &:first-of-type {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        &.orderList__item--star5 {
          background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(45deg, #42d392, #647eff) border-box;
          border: 2px solid transparent;
          padding-block: 0.0625rem;

          span {
            background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 900;
          }

          &.orderList__item--selected {
            background:
              linear-gradient(#d2e3fc, #d2e3fc) padding-box,
              linear-gradient(45deg, #42d392, #647eff) border-box;
            color: #0b57d0;
            border: 2px solid transparent;
            padding-block: 0;
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

        &:not(.orderList__item--star5):has(input:checked) {
          box-shadow: inset 0 0 0 1px #0b57d0;
        }
      }
    }
  }
}

.btnGroup {
  position: fixed;
  z-index: 997;
  bottom: 2rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .btnGroup__btn {
    height: 3.5rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 10px 10px -3px #3333336b;
    color: #0b57d0;
    cursor: pointer;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    background-color: #d2e3fc;

    .btnGroup__icon {
      display: grid;
      place-items: center;
      width: 1.5rem;
    }

    .btnGroup__content {
      display: grid;
      grid-template-columns: v-bind(btnContentWidth);
      overflow: hidden;
      transition: 0.3s ease-in-out;

      p {
        min-width: 0;
      }
    }
  }
}
</style>
