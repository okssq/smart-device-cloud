<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white">
      <layout-header :open="isDrawerOpen" @toggle="onDrawToggle"/>
    </q-header>
    <q-drawer
      bordered
      side="left"
      show-if-above
      :mini="isSideMini"
      :width="231"
      :mini-width="57"
      :breakpoint="1000"
      v-model="isDrawerOpen"
      @on-layout="onLayoutToggle"
    >
      <template #default>
        <div class="fit column no-wrap">
          <layout-logo v-if="isDrawMode"/>
          <q-separator v-show="isDrawMode"/>
          <q-scroll-area class="flex1 q-py-sm">
            <q-list class="expand-nav">
              <nav-expand-item
                v-for="item in myMenus"
                :key="item.id"
                :nav="item"
                :router-keys="routerKeys"
              />
            </q-list>
          </q-scroll-area>
          <q-separator/>
          <q-btn
            flat
            v-show="!isDrawMode"
            icon="keyboard_double_arrow_left"
            color="primary"
            style="height: 48px"
            @click="isSideMini = true"
          />
        </div>
      </template>
      <template #mini>
        <div class="fit column no-wrap">
          <q-scroll-area class="flex1 q-py-sm">
            <q-list class="popup-nav">
              <nav-popup-item
                v-for="item in myMenus"
                :key="item.id"
                :nav="item"
                :router-keys="routerKeys"
              />
            </q-list>
          </q-scroll-area>
          <q-separator/>
          <q-btn
            v-show="!isDrawMode"
            icon="keyboard_double_arrow_right"
            color="primary"
            flat
            style="height: 48px"
            @click="isSideMini = false"
          />
        </div>
      </template>
    </q-drawer>
    <q-page-container>
      <div class="bg-grey-1 relative-position overflow-hidden" style="height: calc(100vh - 57px)">
        <router-view/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LayoutHeader from './LayoutHeader'
import NavPopupItem from "./LayoutNav/NavPopupItem"
import NavExpandItem from "./LayoutNav/NavExpandItem"
import LayoutLogo from './logo'
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMenu from './useMenu'
import {useQuasar} from 'quasar'

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const routerKeys = computed(() => route.meta["routerKeys"] || []);
const isDrawMode = ref(false)
const isDrawerOpen = ref(false)
const isSideMini = ref(false)
const {menus, getMenus} = useMenu();
const myMenus = getMenus(menus);
// layout side模式切换事件
const onLayoutToggle = (state) => {
  isDrawMode.value = !state;
}
// 顶部菜单按钮切换事件
const onDrawToggle = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
}

// 渲染初始化路由
const init = () => {
  const prePath = $q.sessionStorage.getItem('router-path') || '/map/terminal-distribute';
  router.push({path: prePath});
}

init();


</script>
