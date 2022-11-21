<template>
  <q-select
    outlined
    dense
    clearable
    use-input
    map-options
    emit-value
    hide-selected
    fill-input
    no-error-icon
    input-class="text-subtitle2 ellipsis"
    popup-content-class="text-grey-7 text-subtitle2 select__content"
    :disable="!allOptions"
    :loading="!allOptions"
    :style="{width: componentWidth}"
    :options="innerOptions"
    @filter="filterFn"

  >
    <template #before>
      <span class="my-form-label" :style="{width: labelWidth}">{{ $attrs['label-text'] }}</span>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          暂无匹配数据
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import {shallowRef, watch, computed, toRaw, ref} from 'vue';

const props = defineProps({
  componentWidth: {
    type: String,
    default: '240px'
  },
  labelWidth: {
    type: String,
    default: ''
  },
  allOptions: {
    type: [Array, null],
    default: null
  },
  emptyValue: {
    type: [String, Number],
    default: ''
  }
});
// const emits = defineEmits([]);
const innerOptions = shallowRef([]);
watch(() => props.allOptions, (val) => {
  if (val) {
    innerOptions.value = val
  }
}, {immediate: true});

const filterFn = (val, update, abort) => {
  if (!val) {
    update(() => {
      innerOptions.value = toRaw(props.allOptions)
    })
  } else {
    const filterText = val.trim().toLowerCase();
    update(() => {
      innerOptions.value = props.allOptions.filter(v => v['label'].toLowerCase().indexOf(filterText) > -1)
    })
  }
}
const onUpdateModelValue = (item) => {
  emits('update:modelValue', item['value']);
}
const onClear = () => {
  emits('update:modelValue', props.emptyValue);
}
</script>
