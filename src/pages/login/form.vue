<template>
  <div style="width: 80%;">
    <q-form class="q-gutter-md login-form" @submit="onSubmit" autocomplete="off">
      <div class="q-ma-none q-mb-xl text-center">
        <q-img src="~assets/images/logo-text.png" style="width: 70%"/>
      </div>
      <q-input
        v-model="name"
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
        autofocus
        lazy-rules
        outlined
        placeholder="请输入用户名"
        input-class="text-subtitle1"
        autocomplete="off"
      >
        <template #prepend>
          <q-icon name="person_outline" size="20px"/>
          <div class="text-subtitle1 text-grey-7">用户名</div>
        </template>
      </q-input>
      <q-input
        v-model="pass"
        :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
        lazy-rules
        outlined
        input-class="text-subtitle1"
        type="password"
        placeholder="请输入密码"
        autocomplete="new-password"
      >
        <template #prepend>
          <q-icon name="o_lock" size="20px"/>
          <div class="text-subtitle1 text-grey-7">密码</div>
        </template>
      </q-input>
      <div class="row no-wrap">
        <q-btn
          :loading="loading"
          class="flex1"
          color="primary"
          label="登录"
          type="submit"
          size="lg"
          unelevated
        />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import useSystemStore from 'stores/store-system';
import {notifySuccess} from "src/util/common";
import {ref} from "vue";


const systemStore = useSystemStore();
const name = ref("");
const pass = ref("");
const loading = ref(false);


const onSubmit = () => {
  loading.value = true;
  new Promise((resole) => {
   setTimeout(() => {

     notifySuccess('登录成功');
     systemStore.renderLogin({
       realName: name.value
     });
     loading.value = false;
     resole();
   },500)
  })
};

</script>

