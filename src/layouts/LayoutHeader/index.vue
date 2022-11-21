<template>
  <div class="row no-wrap items-center layout-header">
    <q-btn v-show="!open" class="q-mx-sm" color="grey-8" icon="menu" round flat @click="onDrawToggle"/>
    <logo v-show="open" />
    <div class="bd gt-xs" />
    <ops-crumb />
    <q-space />
    <div class="q-px-xs text-grey-8 row no-wrap items-center">
      <!--二维码-->
      <ops-qrcode />
      <!--铃铛与设置-->
      <ops-setting />
      <!--用户名-->
      <ops-user />
    </div>
  </div>
<div>

</div>
</template>

<script setup>
import Logo from '../logo'
import OpsQrcode from "./OpsQrcode";
import OpsCrumb from './OpsCrumb'
import OpsUser from './OpsUser'
import OpsSetting from './OpsSetting'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['toggle'])
const onDrawToggle = () => {
  emits('toggle')
}
</script>

<style lang="scss" scoped>
.layout-header {
  height: 56px;
  z-index: 11;
  .bd {
    width: 1px;
    background-color: #75757590;
    height: 10px;
    margin-right: 16px;
  }
}


</style>
