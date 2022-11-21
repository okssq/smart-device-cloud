<template>
  <q-breadcrumbs v-show="crumbs" class="gt-xs text-grey-8" gutter="sm">
    <template #separator>
      <q-icon color="grey-8" name="navigate_next" size="1em"/>
    </template>
    <q-breadcrumbs-el
      v-for="(item, index) in crumbs"
      :key="index"
      :label="item"
    />
  </q-breadcrumbs>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const crumbs = computed(() => route.meta['crumbs']);
</script>
