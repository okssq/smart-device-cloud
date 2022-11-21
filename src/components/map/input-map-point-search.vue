<template>
  <q-input
    input-class="text-subtitle2"
    borderless
    dense
    placeholder="请输入查询地址关键字"
    @focus="listVisible = true"
    @update:model-value="onInputChange"
  >
    <template #prepend>
      <q-icon class="q-ml-sm" name="search"/>
    </template>
    <template #append>
      <div class="q-mr-sm"/>
    </template>
    <q-menu
      v-model="listVisible"
      anchor="bottom left"
      fit
      no-focus
      no-parent-event
      no-refocus
      self="top left"
    >
      <q-list v-show="filterList.length" bordered dense padding separator>
        <template v-for="(item, index) in filterList" :key="index">
          <q-item clickable @click="filterSelectItem(item)">
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption>
                {{ item.address }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-input>
</template>

<script setup>
import {ref, shallowRef, onBeforeUnmount} from "vue";

let suggest = new TMap.service.Suggestion({
  pageSize: 10,
});

const emit = defineEmits(['select']);
const listVisible = ref(false);
const filterList = shallowRef([]);
let timer = 0;
// 搜索文字改变事件
const onInputChange = (val) => {
  clearTimeout(timer);
  timer = 0;
  timer = setTimeout(() => {
    console.log('1111-onInputChange',val)
    if (!val) {
      filterList.value = [];
      return null;
    }
    suggest.getSuggestions({keyword: val})
      .then(result => {
        const {data} = result;
        // console.log('data', data);
        filterList.value = data.filter(el => el.location);
      })
      .catch((error) => {
        console.log(error);
      });
  },750)
};

// 搜索列表项选择事件
const filterSelectItem = (item) => {
  listVisible.value = false;
  emit('select', item);
};

onBeforeUnmount(() => {
  if(timer){
    clearTimeout(timer);
    timer = 0;
  }
  suggest = null;
})
</script>
