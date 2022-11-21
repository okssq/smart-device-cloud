<template>
  <q-separator inset vertical/>
  <q-btn-dropdown
    :menu-offset="[10, 10]"
    :label="loginInfo ? loginInfo.realName : '-'"
    class="q-mx-sm"
    flat
  >
    <div class="q-px-sm q-py-sm text-right">
      <q-btn
        v-close-popup
        class="full-width text-no-wrap"
        color="primary"
        label="退出登录"
        padding="4px 30px"
        unelevated
        @click="onLoginOut"
      />
    </div>
  </q-btn-dropdown>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import useSystemStore from "stores/store-system";

const systemStore = useSystemStore();
const { loginInfo } = storeToRefs(systemStore);


const onLoginOut = () => {
  systemStore.onLogout();
};

</script>
