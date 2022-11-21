<template>
  <q-dialog persistent ref="dialogRef">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="40px" icon="warning" color="red-5" text-color="white" />
        <span class="q-ml-sm text-red-5 text-bold"
          >{{title}}</span
        >
      </q-card-section>

      <q-card-actions align="right" class="q-mb-sm">
        <q-btn dense flat label="取消" color="primary" @click="onDialogHide" />
        <q-btn
          class="q-mr-sm"
          dense
          unelevated
          label="确定"
          color="primary"
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useDialogPluginComponent } from "quasar";
export default {
  emits: [...useDialogPluginComponent.emits],
  props: {
    title: {
      type: String,
      default: '您确定要删除此条记录吗？'
    }
  },
  setup() {
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogOK,
      onDialogHide,
    };
  },
};
</script>
