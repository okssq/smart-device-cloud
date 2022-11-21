<template>
  <q-field
    outlined
    dense
    clearable
    no-error-icon
    lazy-rules="ondemand"
    :style="{width: componentWidth}"
  >
    <template #before>
      <span class="my-form-label" :style="{width: labelWidth}">{{ $attrs['label-text'] || '地图围栏：' }}</span>
    </template>
    <template #control>
      <q-btn
        flat
        class="full-width"
        icon="draw"
        :label="modelValue? address : '地图绘制围栏'"
        @click="onDrawFence"
      />
    </template>
  </q-field>
</template>

<script setup>
import {useQuasar} from "quasar";
import DialogMapFence from 'components/map/map-fence'

const emit = defineEmits(['update']);
const props = defineProps({
  mapStr: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  componentWidth: {
    type: String,
    default: '240px'
  },
  labelWidth: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String,null],
    default: null
  }
});
const $q = useQuasar();
const onDrawFence = () => {
  let path = null;
  let point = null;
  if(props.mapStr){
    try{
      const [a,b] = (props.mapStr).split(';');
      const [longitude,latitude] = a.split(',');
      point = {longitude: Number(longitude), latitude:Number(latitude)};
      path = JSON.parse(b);
    } catch (e){
      console.log('围栏路径转换错误',e);
    }
  }

  $q.dialog({
    component: DialogMapFence,
    componentProps: {
      path,
      point,
      type: 'edit',
      address: props.address
    },
  }).onOk(param => {
    emit('update',param);
  });
}
</script>
