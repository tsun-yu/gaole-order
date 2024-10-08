<script setup>
import { computed } from 'vue';

const isSelectedCol = defineModel('isSelectedCol', {
  type: Array,
  default: []
});
const props = defineProps(['orderDisplay', 'orderList']);

const isSelectedColDisplay = computed(() => {
  return isSelectedCol.value.reduce((acc, curr) => {
    const itemInOrderDisplay =
      props.orderDisplay.find((item) => item.id === curr) ||
      props.orderList.find((item) => item.id === curr);

    return [...acc, itemInOrderDisplay];
  }, []);
});
</script>

<template>
  <div class="container">
    <div class="orderList">
      <div v-for="col of isSelectedColDisplay" :key="'order' + col.id" class="orderList__col">
        <label :for="'column' + col.id" class="orderList__selectBtn">
          <v-icon name="fa-times-circle" scale="1" fill="#d1d6d4" />
        </label>
        <div class="orderList__wrap">
          <div
            class="orderList__item"
            :class="{
              'orderList__item--selected': item?.selected,
              'orderList__item--star5': item.name[0] !== 's' && item.name[0] !== 'c',
              'orderList__item--star4': item.name.includes('s4') || item.name.includes('cp'),
              'orderList__item--star3': item.name.includes('s3')
            }"
            v-for="(item, i2) of col.order"
            :key="'orderr' + i2"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #ffffff3a;
  backdrop-filter: blur(2px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  z-index: 2;

  .orderList {
    width: 95%;
    height: 95%;
    background-color: #f6f8fc;
    border-radius: 1.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    display: grid;
    gap: 0.1875rem;
    grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));
    box-shadow:
      0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .orderList__col {
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
          font-size: 1.125rem;
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
        }
      }
    }
  }
}
</style>
