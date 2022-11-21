<template>
  <q-separator v-show="setting.bell" inset vertical/>
  <q-btn
    v-show="setting.bell"
    class="q-mx-sm"
    dense
    flat
    icon="o_notifications"
    round
  >
    <q-tooltip :offset="[10, 12]" class="bg-green text-grey-1 text-subtitle2">警报提示</q-tooltip>
    <!--    <q-badge color="red-5" floating rounded transparent>4</q-badge>-->
    <q-menu anchor="bottom middle" :offset="[10,12]" class="z-max" self="top middle">
      <div class="q-pa-md text-grey-6" style="width: 200px">暂无数据信息</div>
      <!--      <div>-->
      <!--        <q-scroll-area style="height: 260px; width: 300px;">-->
      <!--          <q-list separator>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>New tab</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>New incognito tab</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>Recent tabs</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>History</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>Downloads</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>Settings</q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item clickable>-->
      <!--              <q-item-section>Help &amp; Feedback</q-item-section>-->
      <!--            </q-item>-->
      <!--          </q-list>-->
      <!--        </q-scroll-area>-->
      <!--        <q-separator/>-->
      <!--        <q-item class="q-pa-sm">-->
      <!--          <q-btn v-close-popup color="red-5" flat label="清空通知" unelevated/>-->
      <!--          <q-btn v-close-popup color="light-blue-10" flat label="查看更多"/>-->
      <!--        </q-item>-->
      <!--      </div>-->
    </q-menu>
  </q-btn>
  <q-separator inset vertical/>
  <q-btn class="q-mx-sm" dense flat icon="o_settings" round size="13px">
    <q-tooltip :offset="[10, 12]" class="bg-green text-grey-1 text-subtitle2">系统设置</q-tooltip>
    <q-menu anchor="bottom middle" :offset="[10,12]" class="z-max" self="top middle">
      <q-list dense padding separator>
        <q-item>
          <q-item-section>小铃铛提示</q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="setting.bell"
              color="green"
              @update:model-value="updateSetting('bell')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>报警弹窗</q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="setting.notify"
              color="green"
              @update:model-value="updateSetting('notify')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>警报声音</q-item-section>
          <q-item-section side>
            <q-toggle
              :model-value="setting.voice"
              color="green"
              @update:model-value="updateSetting('voice')"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>

import { storeToRefs } from 'pinia';
import useSystemStore from 'stores/store-system';

const systemStore = useSystemStore();
const { setting } = storeToRefs(systemStore);
const updateSetting = (type) => {
  systemStore.changeSettingByKey({
    key: type,
    value: !setting.value[type]
  })
};

</script>
