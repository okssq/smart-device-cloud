<template>
  <q-dialog ref="dialogRef" persistent no-esc-dismiss>
    <q-card class="relative-position overflow-hidden" style="width: 960px; max-width: 98vw">
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">
          设置设备位置
        </div>
        <q-btn
          flat
          round
          size="12px"
          icon="clear"
          @click="onDialogHide"
        />
      </div>
      <q-separator />
      <div class="relative-position">
        <div class="relative-position" style="width: 100%; height: 600px">
          <global-map @load="onMapLoadSuccess"/>
        </div>
        <q-separator/>
        <q-card-actions align="right" v-if="editVisible">
          <form-input-text style="flex: 1" class="q-mr-md" label-text="设备地址：" v-model="inputAddress"/>
          <q-btn color="primary" flat label="取消" @click="onDialogHide"/>
          <q-btn color="primary" label="确定" @click="onSubmit"/>
        </q-card-actions>
        <q-inner-loading :showing="loading" class="z-max">
          <q-spinner-tail color="primary" size="2em"/>
        </q-inner-loading>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import FormInputText from 'components/form/input-text';
import GlobalMap from "components/map";
import useMapStore from 'stores/store-map';
import {useDialogPluginComponent} from "quasar";
import {ref, onBeforeUnmount} from "vue";
import {notifyWarn} from "src/util/common";

const emit = defineEmits([...useDialogPluginComponent.emits]);
const props = defineProps({
  point: {
    type: [Object, null],
    default: null
  },
  address: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'view', //查看围栏view;编辑围栏edit；
  }
});
const {dialogRef, onDialogOK, onDialogHide} = useDialogPluginComponent();
let map = null;
let markers = null;
let ipLocation = null;

const mapStore = useMapStore();
const loading = ref(false);
const inputAddress = ref(props.address);
const editVisible = ref(false);
// 根据IP获取当前位置
const getLocation = () => {
  return new Promise((resolve, reject) => {
    ipLocation = new TMap.service.IPLocation(); // 新建一个IP定位类
    ipLocation.locate().then(res => {
      resolve(res.result.location)
    }).catch(() => {
      reject(false)
    })
  })
}
// 渲染点标记
const renderMarker = (location) => {
  if (!markers) {
    markers = new TMap.MultiMarker({
      map,
      geometries: [],
    });
  }
  markers.updateGeometries([
    {
      id: 'marker',
      position: location, // 将所得位置绘制在地图上
    },
  ]);
  map.setCenter(location);
  map.setZoom(18);
}
// 地图点击事件
const onMapClick = (e) => {
  const {latLng} = e;
  renderMarker(latLng);
}
// 地图加载成功后事件
const onMapLoadSuccess = () => {
  console.log('props',props);
  loading.value = true;
  map = mapStore.map;
  if(props.point){
    const location = new TMap.LatLng(props.point.latitude, props.point.longitude);
    renderMarker(location);
  }
  if (props.type === 'edit') {
    editVisible.value = true;
    map.on('click',onMapClick);
    if(!props.point){
      getLocation().then(location => {
        renderMarker(location);
      })
    }
  }
  loading.value = false;
}
// 编辑完成提交表单事件
const onSubmit = () => {
  loading.value = true;
  const param = {};
  if (!inputAddress.value) {
    notifyWarn('详细地址不能为空');
    loading.value = false;
    return null;
  } else {
    param['address'] = inputAddress.value;
  }
  if (!markers) {
    notifyWarn('请选择点位');
    loading.value = false;
    return null;
  } else {
    const markerGeometry = markers.getGeometryById('marker');
    const {position} = markerGeometry;
    const {lat, lng} = position;
    const positionStr = `${lng},${lat}`;
    param['gpsInfo'] = positionStr;
    onDialogOK(param);
    onDialogHide();
  }
}
// 清除地图资源
const onClearMap = () => {
  if (markers) {
    markers.setMap(null);
    markers = null;
  }
  ipLocation = null;
  if (map){
    map.off('click',onMapClick)
  }
}

onBeforeUnmount(() => {
  onClearMap();
})
</script>
