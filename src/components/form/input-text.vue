<template>
  <q-input
    input-class="text-subtitle2"
    outlined
    dense
    no-error-icon
    :style="{width: componentWidth}"
  >
    <template #before>
      <span class="my-form-label" :style="{width: labelWidth}">{{ $attrs['label-text'] }}</span>
    </template>
  </q-input>
</template>

<script setup>
const props = defineProps({
  componentWidth: {
    type: String,
    default: '240px'
  },
  labelWidth: {
    type: String,
    default: ''
  },
});

</script>

