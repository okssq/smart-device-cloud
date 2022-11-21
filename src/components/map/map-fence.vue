<template>
  <q-dialog ref="dialogRef" persistent no-esc-dismiss>
    <q-card class="relative-position overflow-hidden" style="width: 960px; max-width: 98vw">
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">
          项目所属区域
          <q-btn v-if="editVisible" class="q-ml-md" color="red" dense icon="tips_and_updates" unelevated size="sm">
            使用说明
            <q-tooltip anchor="top end" self="top left" class="bg-white text-grey-8 shadow-2" :offset="[10, 10]">
              <div style="max-width: 400px">
                <div class="q-px-md q-py-sm">
                  <div class="q-gutter-y-sm">
                    <div class="text-subtitle2 text-bold">绘制模式</div>
                    <div class="text-body2">
                      开始绘制：鼠标左键点击及移动即可绘制图形
                    </div>
                    <div class="text-body2">
                      完成绘制：鼠标左键双击即可自动合并绘制图形
                    </div>
                    <div class="text-body2">
                      中断绘制：绘制过程中按下esc键可中断该过程
                    </div>
                  </div>
                </div>
                <q-separator/>
                <div class="q-px-md q-py-sm">
                  <div class="q-gutter-y-sm">
                    <div class="text-subtitle2 text-bold">编辑模式</div>
                    <div class="text-body2">
                      选中编辑：鼠标左键点击图形
                    </div>
                    <div class="text-body2">
                      更改编辑：选中图形后出现编辑点，拖动编辑点可移动顶点位置，双击实心编辑点可删除顶点
                    </div>
                    <div class="text-body2">
                      中断编辑：按下esc键可中断当前操作，点选的图形将取消选中，编辑过程将中断
                    </div>
                    <div class="text-caption text-grey-7">
                      tip：若出现编辑、绘制失效，可更换操作模式后继续绘制或重新选中图形编辑
                    </div>
                  </div>
                </div>
              </div>
            </q-tooltip>
          </q-btn>
        </div>
        <q-btn
          flat
          round
          size="12px"
          icon="clear"
          @click="onDialogHide"
        />
      </div>
      <q-separator/>
      <div class="relative-position">
        <div class="relative-position" style="width: 100%; height: 600px">
          <!--  地图  -->
          <global-map @load="onMapLoadSuccess"/>
          <!--  地址搜索框  -->
          <q-btn-toggle
            v-if="editVisible"
            v-model="editorMode"
            push
            glossy
            class="absolute bg-white z-top"
            style="left: 50%;top: 15px;transform:translateX(-50%);"
            toggle-color="primary"
            :options="[
                {label: '绘制',value: 'DRAW'},
                {label: '编辑',value: 'INTERACT'}
              ]"
            @update:model-value="onModelChange"
          />
          <section
            class="absolute-top-right bg-white rounded-borders shadow-4 q-py-xs z-top"
            style="right: 10px; top: 15px;width:320px"
            v-if="editVisible"
          >
            <input-map-point-search v-model="searchText" @select="onSetMapCenter"/>
          </section>
        </div>
        <q-separator/>
        <q-card-actions align="right" v-if="editVisible">
          <form-input-text style="flex: 1" class="q-mr-md" label-text="项目所在详细地址：" v-model="inputAddress"/>
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
import InputMapPointSearch from "components/map/input-map-point-search";
import GlobalMap from "components/map";

import useMapStore from 'stores/store-map';
import {useDialogPluginComponent} from "quasar";
import {ref, onBeforeUnmount} from "vue";
import {notifyWarn} from "src/util/common";

const emit = defineEmits([...useDialogPluginComponent.emits]);
const props = defineProps({
  path: {
    type: [Array, null],
    default: null,
  },
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
let ipLocation = null;
let markers = null;
let multiPolygon = null;
let editor = null;

const mapStore = useMapStore();
const loading = ref(false);
const searchText = ref('');
const inputAddress = ref(props.address);
const editorMode = ref('DRAW');
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
// 渲染围栏
const renderFence = (path) => {
  if (!multiPolygon) {
    multiPolygon = new TMap.MultiPolygon({
      map,
      zIndex: 10,
      styles: {
        default: new TMap.PolygonStyle({
          color: 'rgba(255, 255, 0, 0.6)'
        })
      },
      geometries: [
        {
          id: 'fence',
          paths: path
        },
      ]
    })
  } else {
    multiPolygon.setGeometries([{id: 'fence', paths: path}])
  }
  const computedBounds = TMap.geometry.computeBoundingRectangle(path)
  setTimeout(() => {
    map.fitBounds(computedBounds, {
      padding: 80,
      easing: {
        duration: 700
      }
    });
  }, 350);
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
}

// 渲染图像编辑器
const renderEditor = (path) => {
  renderFence(path);
  editorMode.value = 'INTERACT';
  editor.setActionMode(TMap.tools.constants.EDITOR_ACTION.INTERACT);
  const location = TMap.geometry.computeCentroid(path);
  renderMarker(location);
}
// 围栏编辑/绘制完成
const onFenceComplete = (geometry) => {
  renderEditor(geometry.paths);
}
// 初始化图形编辑器
const initEditor = () => {
  if (!multiPolygon) {
    multiPolygon = new TMap.MultiPolygon({
      map: map,
    });
  }
  if (!editor) {
    editor = new TMap.tools.GeometryEditor({
      map: map,
      overlayList: [{
        overlay: multiPolygon,
        id: 'polygon',
      }],
      actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, // 编辑器的工作模式
      activeOverlayId: 'polygon', // 激活图层
      snappable: true, // 开启吸附
      selectable: true,
    });
    editor.on('draw_complete', onFenceComplete)
    editor.on('adjust_complete', onFenceComplete)
  }
  editor.setActiveOverlay('polygon');
}
// 操作模式改变事件
const onModelChange = (val) => {
  editor.setActionMode(TMap.tools.constants.EDITOR_ACTION[val])
}
// 地图加载成功后事件
const onMapLoadSuccess = () => {
  loading.value = true;
  map = mapStore.map;
  // 组件为查看围栏功能时
  if (props.type === 'view') {
    if (props.path) {
      const path = props.path.map(el => new TMap.LatLng(el['latitude'], el['longitude']));
      renderFence(path);
    }
    if (props.point) {
      const location = new TMap.LatLng(props.point.latitude, props.point.longitude);
      renderMarker(location);
    }
    loading.value = false;
  }
  // 组件为编辑围栏功能
  else if (props.type === 'edit') {
    initEditor();
    if (!(props.path && props.point)) {
      getLocation().then(location => {
        map.setCenter(location);
        map.setZoom(18);
      })
    } else {
      if (props.path) {
        const path = props.path.map(el => new TMap.LatLng(el['latitude'], el['longitude']));
        renderEditor(path);
      }
    }
    editVisible.value = true;
    loading.value = false;
  }
}
// 设置地图中心点及点名称
const onSetMapCenter = (item) => {
  const {location, title} = item;
  searchText.value = title;
  map.setZoom(17);
  map.setCenter(location);
}

// 清除地图资源
const onClearMap = () => {

  if (markers) {
    markers.setMap(null);
    markers = null;
  }
  if (multiPolygon) {
    multiPolygon.setMap(null);
    multiPolygon = null;
  }
  if (editor) {
    editor.off('draw_complete', onFenceComplete)
    editor.off('adjust_complete', onFenceComplete)
    editor.setMap(null);
    editor.destroy();
    editor = null;
  }
  ipLocation = null;
}
// 编辑完成提交表单事件
const onSubmit = () => {
  loading.value = true;
  // 如果状态为正在编辑，取消正在编辑状态
  editorMode.value = 'DRAW';
  editor.setActionMode(TMap.tools.constants.EDITOR_ACTION.DRAW);
  const param = {};
  if (!inputAddress.value) {
    notifyWarn('详细地址不能为空');
    loading.value = false;
    return null;
  } else {
    param['address'] = inputAddress.value;
  }

  if (!markers) {
    notifyWarn('项目围栏绘制不能为空');
    loading.value = false;
    return null;
  } else {
    const markerGeometry = markers.getGeometryById('marker');
    const {position} = markerGeometry;
    const {lat, lng} = position;
    const positionStr = `${lng},${lat};`;
    param['mapStr'] = positionStr;
  }
  if (!multiPolygon) {
    notifyWarn('项目围栏绘制不能为空');
    loading.value = false;
    return null;
  } else {
    const polygonGeometry = multiPolygon.getGeometryById('fence');
    const {paths} = polygonGeometry;
    const arr = paths.map(el => {
      const {lat, lng} = el;
      return {
        longitude: lng,
        latitude: lat
      }
    })
    param['mapStr'] += JSON.stringify(arr);
  }
  onDialogOK(param);
  onDialogHide();
}
onBeforeUnmount(() => {
  onClearMap();
})


</script>
