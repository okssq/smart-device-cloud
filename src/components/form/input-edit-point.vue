<template>
  <q-field
    outlined
    dense
    no-error-icon
    lazy-rules="ondemand"
    :style="{width: componentWidth}"
  >
    <template #before>
      <span class="my-form-label" :style="{width: labelWidth}">{{ $attrs['label-text'] || '设备地址：' }}</span>
    </template>
    <template #control>
      <q-btn
        flat
        class="full-width"
        icon="gps_fixed"
        :label="address || '地图选址'"
        @click="onChooseLocation"
      />
    </template>
  </q-field>
</template>

<script setup>
import {useQuasar} from "quasar";
import MapPoint from 'components/map/map-point'

const emit = defineEmits(['update']);
const props = defineProps({
  componentWidth: {
    type: String,
    default: '240px'
  },
  labelWidth: {
    type: String,
    default: ''
  },
  gpsInfo: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
});
const $q = useQuasar();
const onChooseLocation = () => {
  let point = null;
  try {
    const [longitude, latitude] = (props.gpsInfo).split(',');
    if (longitude && latitude) {
      point = {longitude: Number(longitude), latitude: Number(latitude)};
    }
  } catch (e) {
    console.log('gpsInfo转换错误', e);
  }

  $q.dialog({
    component: MapPoint,
    componentProps: {
      point,
      type: 'edit',
      address: props.address
    },
  }).onOk(param => {
    emit('update', param);
  });
}
</script>
