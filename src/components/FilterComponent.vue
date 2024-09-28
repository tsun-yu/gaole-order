<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import MultiSelect from '../components/form/MultiSelect.vue';
import TheSupport from '@/views/TheSupport.vue';

const hasSelected = defineModel('data', {
  type: Array
});
const props = defineProps(['allPokemon']);

const star5 = ref([]);
const star4 = ref([]);
const star3 = ref([]);
const star12 = ref([]);

watchEffect(() => {
  if (!props.allPokemon) return;
  star5.value = props.allPokemon[0].star5;
  star4.value = props.allPokemon[0].star4;
  star3.value = props.allPokemon[0].star3;
  star12.value = props.allPokemon[0].star12;
});

const btnWrap = ref(null);
const filter = ref(null);

const filterShow = ref(false);
const supportShow = ref(false);
const filterBtnLeft = ref('');
const filterBtnTop = ref('5rem');
const filterBtnTransition = ref('0s');
const accordion = ref(null);

watchEffect(() => {
  if (!filterShow.value) supportShow.value = false;
});

watchEffect(() => {
  if (!filterShow.value) {
    accordion.value = null;
  }
});

const handler = (e) => {
  if (e.target.id === accordion.value) {
    accordion.value = null;
  }
};

onMounted(() => {
  const btnW = btnWrap.value.clientWidth;
  const btnH = btnWrap.value.clientHeight;
  filterBtnLeft.value = window.innerWidth - btnW - 5 + 'px';

  //outside click to close filter
  filter.value.addEventListener('click', (e) => {
    if (e.target === filter.value) {
      filterShow.value = false;
    }
  });
  btnWrap.value.addEventListener('touchmove', (e) => {
    const newX = e.touches[0].clientX - btnW / 2;
    const newY = e.touches[0].clientY - btnH / 2;

    filterBtnTransition.value = '0s';
    filterBtnLeft.value = newX + 'px';
    filterBtnTop.value = newY + 'px';
    e.preventDefault();
  });
  btnWrap.value.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const halfWindowWidth = window.innerWidth / 2;
    const maxTop = window.innerHeight - btnH - 5;
    const maxLeft = window.innerWidth - btnW - 5;
    filterBtnTransition.value = '0.2s ease-in-out';

    const newX = touch.clientX >= halfWindowWidth ? maxLeft : 5;
    filterBtnLeft.value = `${newX}px`;

    if (touch.clientY >= maxTop) {
      filterBtnTop.value = `${maxTop}px`;
    }
    if (touch.clientY < 0) {
      filterBtnTop.value = `5px`;
    }
  });
  btnWrap.value.addEventListener('mousedown', (mousedownEvent) => {
    const offsetX = mousedownEvent.offsetX;
    const offsetY = mousedownEvent.offsetY;

    const mousemoveHandler = (mousemoveEvent) => {
      const newX = mousemoveEvent.clientX - offsetX;
      const newY = mousemoveEvent.clientY - offsetY;
      filterBtnTransition.value = '0s';
      filterBtnLeft.value = newX + 'px';
      filterBtnTop.value = newY + 'px';
    };
    const mouseupHandler = (mouseupEvent) => {
      document.removeEventListener('mousemove', mousemoveHandler);
      filterBtnTransition.value = '0.2s ease-in-out';
      document.removeEventListener('mouseup', mouseupHandler);

      const halfWindowWidth = window.innerWidth / 2;
      const maxTop = window.innerHeight - btnH - 5;
      const maxLeft = window.innerWidth - btnW - 5;

      const newX = mouseupEvent.clientX >= halfWindowWidth ? maxLeft : 5;
      filterBtnLeft.value = `${newX}px`;

      if (mouseupEvent.clientY >= maxTop) {
        filterBtnTop.value = `${maxTop}px`;
      }
      if (mouseupEvent.clientY < 0) {
        filterBtnTop.value = `5px`;
      }
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  });
});
</script>

<template>
  <div class="filter" ref="filter">
    <input type="checkbox" name="showFilterHandler" id="showFilterHandler" v-model="filterShow" />
    <input
      type="checkbox"
      name="showSupportHandler"
      id="showSupportHandler"
      v-model="supportShow"
    />
    <div class="btnWrap" ref="btnWrap">
      <label for="showFilterHandler">
        <v-icon v-show="!filterShow" name="md-settings-round" scale="2.2" fill="#0b57d0" />
        <v-icon v-show="filterShow" name="pr-times" scale="2.2" fill="#0b57d0" />
      </label>
      <label class="supportBtn" for="showSupportHandler">
        <v-icon v-show="!supportShow" name="md-qrcode2-round" scale="2.2" fill="#0b57d0" />
        <v-icon v-show="supportShow" name="pr-times" scale="2.2" fill="#0b57d0" />
      </label>
    </div>
    <div class="supportOpts">
      <TheSupport bgColor="#fff" v-if="supportShow" />
    </div>
    <div class="filterOpts">
      <div class="filter__accordion">
        <input
          type="radio"
          name="starCollapse"
          id="star5collapse"
          @click="handler"
          v-model="accordion"
          value="star5collapse"
        />
        <label for="star5collapse"
          ><p>⭐⭐⭐⭐⭐</p>
          <p class="filter__arrow">
            <v-icon name="io-chevron-down-outline" scale="1.25" fill="#fff" />
          </p>
        </label>
        <div class="filter__opts">
          <multi-select
            :id="'star5Opt'"
            :checkboxOpts="star5"
            v-model:data="hasSelected"
            :optMaxWidth="'10rem'"
          ></multi-select>
        </div>
      </div>
      <div class="filter__accordion">
        <input
          type="radio"
          name="starCollapse"
          id="star4collapse"
          value="star4collapse"
          v-model="accordion"
          @click="handler"
        />
        <label for="star4collapse">
          <p>⭐⭐⭐⭐</p>
          <p class="filter__arrow">
            <v-icon name="io-chevron-down-outline" scale="1.25" fill="#0b57d0" /></p
        ></label>
        <div class="filter__opts">
          <multi-select
            :id="'star4Opt'"
            :checkboxOpts="star4"
            v-model:data="hasSelected"
            :optMaxWidth="'10rem'"
          ></multi-select>
        </div>
      </div>
      <div class="filter__accordion">
        <input
          type="radio"
          name="starCollapse"
          id="star3collapse"
          value="star3collapse"
          v-model="accordion"
          @click="handler"
        />
        <label for="star3collapse">
          <p>⭐⭐⭐</p>
          <p class="filter__arrow">
            <v-icon name="io-chevron-down-outline" scale="1.25" fill="#0b57d0" /></p
        ></label>
        <div class="filter__opts">
          <multi-select
            :id="'star3Opt'"
            :checkboxOpts="star3"
            v-model:data="hasSelected"
            :optMaxWidth="'10rem'"
          ></multi-select>
        </div>
      </div>
      <div class="filter__accordion">
        <input
          type="radio"
          name="starCollapse"
          id="star12collapse"
          value="star12collapse"
          v-model="accordion"
          @click="handler"
        />
        <label for="star12collapse">
          <p>⭐⭐ & ⭐</p>
          <p class="filter__arrow">
            <v-icon name="io-chevron-down-outline" scale="1.25" fill="#fff" /></p
        ></label>
        <div class="filter__opts">
          <multi-select
            :id="'star12Opt'"
            :checkboxOpts="star12"
            v-model:data="hasSelected"
            :optMaxWidth="'10rem'"
          ></multi-select>
        </div>
      </div>
      <p class="filter__btn">
        <span id="clearBtn" @click="hasSelected.length = 0">Clear</span>
        <span id="doneBtn" @click="filterShow = !filterShow">Done</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 999;

  &:has(#showFilterHandler:checked) {
    height: 100dvh;
  }

  .btnWrap {
    width: 4rem;
    height: 4rem;
    position: fixed;
    top: v-bind(filterBtnTop);
    left: v-bind(filterBtnLeft);
    z-index: 999;
    transition: v-bind(filterBtnTransition);

    label {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #d2e3fc;
      cursor: pointer;
      display: grid;
      place-items: center;
      border-radius: 50%;
      box-shadow:
        0 4px 8px 3px rgba(0, 0, 0, 0.15),
        0 1px 3px rgba(0, 0, 0, 0.3);
      top: 0;

      &.supportBtn {
        z-index: -1;
        box-shadow: none;
        transition: top 0.3s ease-in-out;
      }
    }
  }
  #showFilterHandler {
    display: none;

    &:checked {
      & ~ .filterOpts {
        top: 0;
      }
      & ~ .btnWrap {
        .supportBtn {
          top: 4.5rem;
          box-shadow:
            0 4px 8px 3px rgba(0, 0, 0, 0.15),
            0 1px 3px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  #showSupportHandler {
    display: none;

    &:checked {
      & ~ .supportOpts {
        top: 0;
      }
      & ~ .btnWrap {
        .supportBtn {
          border: 2px solid #0b57d0;
        }
      }
    }
  }

  .filterOpts {
    position: fixed;
    top: -23.875rem;
    width: 95%;
    padding: 0.625rem;
    border-radius: 1.5rem;
    margin-top: 1rem;
    background-color: #e9eef6;
    box-shadow:
      0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    height: fit-content;
    max-height: 95dvh;
    overflow: auto;
    transition: 0.3s ease-in-out;
    z-index: 997;

    &::-webkit-scrollbar {
      display: none;
    }
    .filter__accordion {
      background-color: #fff;
      margin: 0.125rem;
      border-radius: 0.25rem;

      &:first-child {
        border-top-left-radius: 1.125rem;
        border-top-right-radius: 1.125rem;
      }
      &:last-of-type {
        border-bottom-left-radius: 1.125rem;
        border-bottom-right-radius: 1.125rem;
      }
      label {
        cursor: pointer;
        padding: 1rem;
        display: block;
        display: flex;
        justify-content: space-between;

        p {
          align-content: center;

          &.filter__arrow {
            width: 2rem;
            aspect-ratio: 1;
            background-color: #f6f8fc;
            border-radius: 50%;
            display: grid;
            place-items: center;
            transition: 0.2s ease-in-out;
          }
        }
      }
      input[type='radio'] {
        display: none;

        &:checked ~ .filter__opts {
          grid-template-rows: 1fr;
        }
        &:checked ~ label .filter__arrow {
          transform: rotate(180deg);
        }
      }
      .filter__opts {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: 0.3s ease-in-out;
      }
    }
    .filter__btn {
      display: flex;
      justify-content: end;

      span {
        cursor: pointer;
        border-radius: 2rem;
        padding: 0.625rem 1.5rem;
        margin-top: 0.25rem;
        font-size: 1.125rem;

        &#clearBtn {
          margin-right: 0.25rem;
          color: #676767;

          &:hover {
            background: rgba(68, 71, 70, 0.08);
          }
        }
        &#doneBtn {
          background-color: #0b57d0;
          color: #fff;

          &:hover {
            background-color: #0b57d0;
            color: #f6f8fc;
          }
        }
      }
    }
  }

  .supportOpts {
    position: fixed;
    top: -100dvh;
    width: 95%;
    padding: 0.625rem;
    border-radius: 1.5rem;
    margin-top: 1rem;
    background-color: #f6f8fc;
    box-shadow:
      0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    height: fit-content;
    max-height: 95dvh;
    overflow: auto;
    transition: 0.3s ease-in-out;
    z-index: 998;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
@media (max-width: 768px) {
  .filter {
    #showFilterHandler {
      &:checked {
        & ~ .btnWrap {
          .supportBtn {
            top: 4rem;
          }
        }
      }
    }
    .btnWrap {
      width: 3.5rem;
      height: 3.5rem;

      label {
        width: 100%;
        height: 100%;

        svg {
          width: 2rem;
        }
      }
    }
  }
}
</style>
