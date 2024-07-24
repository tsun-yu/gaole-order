<script setup>
defineProps({
  sectionWidth: {
    type: String,
    default: '100%'
  },
  sectionMarginTop: {
    type: String,
    default: '0'
  },
  optMaxWidth: {
    type: String,
    default: '14rem'
  },
  accentColor: {
    type: String,
    default: 'var(--color-gray9)'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /* example of checkboxOpts
['董總辦公室', '法務部', '研發部', '業務部', '財務部']
*/
  checkboxOpts: {
    type: Array,
    required: true
  },
  trueValue: {
    default: true
  },
  falseValue: {
    default: false
  },
  id: {
    type: String,
    required: true
  },
  hasOther: {
    type: Boolean,
    default: false
  }
});

const data = defineModel('data', {
  type: Array
});
</script>

<template>
  <div class="formGroup">
    <div class="checkboxGroup">
      <div class="checkboxOpt" v-for="(v, i) of checkboxOpts" :key="id + i">
        <input
          v-show="showCheckbox"
          type="checkbox"
          :id="id + i"
          :name="id"
          :value="v"
          :true-value="trueValue"
          :false-value="falseValue"
          v-model="data"
        />
        <label :for="id + i">{{ v }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  padding-inline: 0.25rem;
  width: v-bind(sectionWidth);
  margin-top: v-bind(sectionMarginTop);
  margin-bottom: 0.125rem;
  min-height: 0;

  > label {
    line-height: 1.625rem;
    margin-right: 0.5rem;
  }

  .chekcHasSelected {
    display: none;
  }
  .checkboxGroup {
    margin: 0.25rem 0.25rem 0.5rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(v-bind(optMaxWidth), 1fr));

    .checkboxOpt {
      display: flex;
      align-items: center;
      box-shadow: 0 0 0 1px #d1d6d4;
      cursor: pointer;
      border-radius: 0.5rem;

      &:hover {
        box-shadow: 0 0 0 2px #d1d6d4;
      }

      &:has(input:checked) {
        box-shadow: 0 0 0 2px #0b57d0;
      }

      label {
        padding: 0.75rem 0.5rem;
        line-height: 1.25rem;
        margin: 0;
        flex: 1;
        cursor: pointer;
        font-weight: 400;
      }

      input {
        cursor: pointer;
        margin-left: 0.5rem;
        accent-color: v-bind(accentColor);
      }
    }
  }
}
</style>
