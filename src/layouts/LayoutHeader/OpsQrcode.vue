<template>
  <q-separator inset vertical />
  <q-btn class="q-mx-sm" dense flat icon="o_qr_code_2" round>
    <q-tooltip :offset="[10, 12]" class="bg-green text-grey-1 text-subtitle2">扫码下载APP</q-tooltip>
    <q-menu
      :offset="[0, 12]"
      anchor="bottom middle"
      class="z-max"
      self="top middle"
    >
      <q-list dense>
        <q-item-label header>手机浏览器扫码下载</q-item-label>
        <q-separator />
        <q-item v-for="item in qrCodes" :key="item.src" v-ripple>
          <q-item-section side style="margin-right: -20px">
            <q-avatar
              :icon="item.icon || void 0"
              color="grey-5"
              size="32px"
              text-color="white"
            >
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-tooltip
            anchor="center left"
            class="z-max bg-grey-1 shadow-9"
            self="center end"
            transition-hide="fade"
            transition-show="fade"
          >
            <q-img
              :src="item.src"
              class="q-pd-md"
              height="140px"
              width="140px"
            />
          </q-tooltip>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  setup() {
    const qrCodes = [
      { icon: "apple", label: "平台APP(苹果版)", src: "./images/qrcode.png" },
      { icon: "android", label: "平台APP(安卓版)", src: "./images/qrcode.png" },
      { icon: "android", label: "装机APP(安卓版)", src: "./images/qrcode.png" },
    ];
    return {
      qrCodes,
    };
  },
};
</script>
