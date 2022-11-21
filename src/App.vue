<template>
  <init-loading v-if="loading"/>
  <router-view v-else/>
</template>

<script setup>
import InitLoading from 'components/init-loading';
import useSystemStore from "stores/store-system";
import {storeToRefs} from 'pinia';

const systemStore = useSystemStore();

const {
  loading,
} = storeToRefs(systemStore);
systemStore.init();
</script>
