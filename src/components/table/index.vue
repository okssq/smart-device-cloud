<template>
  <q-table
    :columns="columns"
    :loading="loading"
    :pagination="{ page: 1, rowsPerPage: 0 }"
    :row-key="rowKey"
    :rows="rows"
    :rows-per-page-options="[0]"
    flat
    binary-state-sort
    virtual-scroll
    hide-pagination
    class="my-table"
    separator="cell"
    style="max-height: 100%"
  >
    <!-- 自定义表header -->
    <template #header="props">
      <q-tr :props="props" class="bg-grey-1">
        <q-th v-if="expand" auto-width/>
        <q-th v-if="index" auto-width>序号</q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          <div class="flex items-center no-wrap">
            <div> {{ col.label }}</div>
            <div v-if="col.sort">
              <q-btn
                dense
                round
                size="sm"
                :icon="sortRule[col.name] && sortRule[col.name]['status'] ? sortIcon[sortRule[col.name]['status']] : 'unfold_more'"
                :color="sortRule[col.name] && sortRule[col.name]['status'] ? 'green' : 'grey-5'"
                flat
              >
                <q-menu auto-close v-if="sortRule[col.name]">
                  <q-list style="min-width: 100px" separator dense>
                    <q-item
                      clickable
                      :active="sortRule[col.name]['status'] === 1"
                      active-class="text-green"
                      @click="$emit('column-sort',{key:col.name,status: 1})"
                    >
                      <q-item-section>升序</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      :active="sortRule[col.name]['status'] === 0"
                      active-class="text-green"
                      @click="$emit('column-sort',{key:col.name,status: 0})"
                    >
                      <q-item-section>默认</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      :active="sortRule[col.name]['status'] ===2"
                      active-class="text-green"
                      @click="$emit('column-sort',{key:col.name,status: 2})"
                    >
                      <q-item-section>降序</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-th>
      </q-tr>
    </template>
    <!-- 自定义表body -->
    <template #body="props">
      <q-tr :props="props">
        <q-td v-if="expand" auto-width>
          <q-btn
            :icon="props.expand ? 'expand_less' : 'expand_more'"
            color="primary"
            dense
            flat
            round
            size="sm"
            @click="props.expand = !props.expand"
          />
        </q-td>
        <q-td v-if="index" auto-width> {{ pageSize * (page - 1) + props.rowIndex + 1 }}</q-td>
        <q-td v-for="col in props.cols" :key="col.field" :props="props">
          <template v-if="col.type && col.type === 'custom'">
            <slot
              :name="`custom-${col.field}`"
              :row="props.row"
              :val="col.value"
            />
          </template>
          <template v-else-if="col.field === 'op'">
            <slot :row="props.row" :val="col.value" name="op"/>
          </template>
          <template v-else>
            {{ (col.value === undefined || col.value === null) ? "-" : col.value }}
          </template>
        </q-td>
      </q-tr>
      <q-tr v-if="expand" v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <slot :row="props.row" name="expand"></slot>
        </q-td>
      </q-tr>
    </template>
    <!-- 自定义表bottom-->
    <template #bottom>
      <div class="full-width row items-center q-pa-sm">
        <span class="text-subtitle2 text-grey-7">
          共搜索到
          <span class="text-primary text-bold">{{ totalCount }} </span> 条数据
        </span>
        <q-space/>
        <div class="row items-center justify-end">
          <q-select
            :model-value="pageSize"
            :options="pageSizes"
            class="q-mx-sm"
            dense
            emit-value
            hide-dropdown-icon
            map-options
            options-dense
            filled
            style="width: 90px"
            @update:model-value="pageSizeChange"
          />
          <q-pagination
            :max="totalPage"
            :max-pages="5"
            :model-value="page"
            boundary-links
            class="q-mx-sm"
            size="12px"
            @update:model-value="pageChange"
          />
          <q-input
            v-model.number="inputPage"
            :max="totalPage"
            class="q-mx-sm"
            dense
            min="1"
            filled
            style="width: 140px"
            type="number"
            @keyup.enter="inputPageChange"
          >
            <template #prepend>
              <span class="text-caption text-bold">跳转到</span>
            </template>
            <template #append>
              <span class="text-caption text-bold">页</span>
            </template>
          </q-input>
        </div>
      </div>
    </template>
    <template #no-data>
      <empty />
    </template>
    <template #loading>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em"/>
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import {ref} from "vue";
import Empty from 'components/empty'
const emit = defineEmits(["edit", "del", "page","column-sort"]);
const componentProps = defineProps({
  expand: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Boolean,
    default: true,
  },
  rowKey: {
    type: String,
    default: "",
  },
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  page: {
    type: Number,
    default: 10,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  sortRule: {
    type: Object,
    default: () => ({})
  }
});

const sortIcon = {
  '1': 'keyboard_double_arrow_up',
  '2': 'keyboard_double_arrow_down'
}
const pageSizes = [10, 20, 30, 50, 100].map((el) => ({
  label: `${el}条/页`,
  value: el,
}));
const inputPage = ref(null);

// 当前查看页数改变
const pageChange = (page) => {
  emit("page", {page});
};
// 每页显示条数改变
const pageSizeChange = (pageSize) => {
  emit("page", {pageSize, page: 1});
};
// 跳转到第几页改变
const inputPageChange = () => {
  const value = inputPage.value + 0;
  if (!/^[0-9]+$/.test(value)) return;
  if (!value && value !== 0) return;
  if (value > componentProps.totalPage) {
    inputPage.value = componentProps.totalPage;
  } else if (value < 1) {
    inputPage.value = 1;
  }
  if (inputPage.value !== componentProps.page) {
    emit("page", {page: inputPage.value});
  }
};
</script>
