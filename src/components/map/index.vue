<template>
  <div id="component-map" class="relative-position fit">
    <div v-if="mapStatus === -1" class="absolute-center">
      <q-btn color="primary" icon="sync" @click="onLoaderMap">
        地图资源加载失败，请重试！
      </q-btn>
    </div>
    <q-inner-loading :showing="mapStatus === 0">
      <q-spinner-gears size="50px" color="primary"/>
    </q-inner-loading>
  </div>
</template>
<script setup>
import {storeToRefs} from "pinia";
import useMapStore from "stores/store-map";
import {onBeforeUnmount, onMounted, watch} from "vue";


const emit = defineEmits(['load']);
const mapStore = useMapStore();
const {mapStatus} = storeToRefs(mapStore);


const insertMap = () => {
  const mapNode = document.getElementById('global-map');
  const componentNode = document.getElementById('component-map');
  componentNode.insertBefore(mapNode,null);
}
const removeMap = () => {
  const mapNode = document.getElementById('global-map');
  const mapWrapNode = document.getElementById('global-map-wrap');
  mapWrapNode.insertBefore(mapNode,null);
}


watch(
  mapStatus,
  () => {
    (mapStatus.value === 1) && emit("load");
  },
  {immediate: true}
);

const onLoaderMap = () => {
  mapStore.loaderMap().then(() => {
    insertMap();
  })
}
onMounted(() => {
  onLoaderMap();
});

onBeforeUnmount(() => {
  removeMap();
});


</script>
