<template>
  <q-item
    clickable
    v-ripple
    :class="navItemClass"
    :to="nav.children ? void 0 : nav.path"
  >
    <div class="flex1 row items-center">
      <q-icon v-if="level === 0" size="24px" :name="nav.icon" style="margin-left: 16px"/>
      <q-icon
        v-else
        style="margin-right: 6px"
        :size="iconSize"
        :name="iconName"
      />
      <div v-if="nav.label && level !== 0" class="nav-label">
        {{ nav.label }}
      </div>
    </div>
    <q-menu
      v-if="nav.children"
      anchor="top right"
      self="top left"
      class="z-max popup-nav"
      :offset="[5, 0]"
    >
      <q-list>
        <nav-item
          :router-keys="routerKeys"
          v-for="item in nav.children"
          :key="item.id"
          :nav="item"
          :level="level + 1"
        />
      </q-list>
    </q-menu>
  </q-item>
</template>

<script>
export default {
  name: 'NavItem'
}
</script>
<script setup>
import {computed} from "vue";

const props = defineProps({
  routerKeys: {
    type: Array,
    default: () => ["01", "01-01"],
  },
  nav: {
    type: Object,
    default: () => ({label: ""}),
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
  const partC = props.level === 0 ? "q-mb-xs" : "";
  return `${partB} ${partA} ${partC}`;
});
</script>
