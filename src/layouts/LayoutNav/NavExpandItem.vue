<template>
  <q-expansion-item
    v-if="nav.children"
    class="q-mb-xs overflow-hidden"
    :class="navItemClass"
    :group="`nav${level}`"
  >
    <template #header>
      <div class="flex1 row items-center no-wrap overflow-hidden">
        <q-icon
          style="margin-left: 6px; margin-right: 16px"
          :size="iconSize"
          :name="iconName"
        />
        <div class="text-no-wrap">{{ nav.label }}</div>
      </div>
    </template>
    <q-list>
      <nav-item
        :router-keys="routerKeys"
        v-for="item in nav.children"
        :key="item.id"
        :nav="item"
        :level="level + 1"
      />
    </q-list>
  </q-expansion-item>
  <q-item
    v-else
    clickable
    v-ripple
    class="q-mb-xs text-grey-7"
    :class="navItemClass"
    :to="nav.children ? void 0 : `/${nav.fullPath}`"
  >
    <div class="row items-center no-wrap overflow-hidden">
      <q-icon
        style="margin-left: 6px; margin-right: 16px"
        :size="iconSize"
        :name="iconName"
      />
      <div class="text-no-wrap">{{ nav.label }}</div>
    </div>
  </q-item>
</template>
<script>
export default {
  name: 'NavItem'
}
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
  routerKeys: {
    type: Array,
    default: () => ["01", "01-01"],
  },
  nav: {
    type: Object,
    default: () => ({ label: "" }),
  },
  level: {
    type: Number,
    default: 0,
  },
})
const iconSize = computed(() => {
  if (props.level === 0) return "24px";
  if (props.level === 1) return "10px";
  return "8px";
});
const iconName = computed(() => {
  if (props.level === 0) return props.nav.icon;
  return props.routerKeys.includes(props.nav.id)
    ? "radio_button_checked"
    : "radio_button_unchecked";
});
const navItemClass = computed(() => {
  const partA = props.routerKeys.includes(props.nav.id)
    ? "active-nav"
    : "text-grey-8";
  const partB = `nav-level${props.level}`;
  return `${partB} ${partA}`;
});

</script>
