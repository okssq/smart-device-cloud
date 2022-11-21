<template>
  <q-field dense outlined :style="{width: componentWidth}">
    <template #before>
      <span class="my-form-label" :style="{width: labelWidth}">{{ labelText }}</span>
    </template>
    <template #control>
      <date-picker
        v-model:value="pickerValue"
        v-bind="datePickerProps"
        @change="onDateUpdate"
      />
    </template>
  </q-field>
</template>

<script setup>
import {date as qDate} from 'quasar';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/zh-cn';
import {ref, toRefs} from "vue";

const props = defineProps({
  detail: {
    type: Boolean,
    default: false,
  },
  date: {
    type: [String, null],
    default: ''
  },
  componentWidth: {
    type: String,
    default: '240px'
  },
  labelText: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: ''
  },
});
const emit = defineEmits(['update:date']);
const datePickerProps = {
  'input-class': "text-subtitle2",
  'format': props.detail ? "YYYY-MM-DD HH:mm:ss" : 'YYYY-MM-DD',
  'value-type': "format",
  'type': props.detail ? 'datetime' : 'date',
  'placeholder': '选择日期',
  'partial-update': true,
  lang: {
    langObject: {
      formatLocale: {
        firstDayOfWeek: 1,
      },
      monthBeforeYear: false,
    },
    langString: 'zh-cn',
  },
  shortcuts: [
    {
      text: '今天',
      onClick: () => qDate.adjustDate(new Date(), {hour: 0, minute: 0, second: 0})
    },
    {
      text: '昨天',
      onClick: () => {
        const today = qDate.adjustDate(new Date(), {hour: 0, minute: 0, second: 0});
        return qDate.subtractFromDate(today, {hours: 24})
      },
    },
    {
      text: '前1个礼拜',
      onClick: () => {
        const today = qDate.adjustDate(new Date(), {hour: 0, minute: 0, second: 0});
        return qDate.subtractFromDate(today, {days: 7})
      },
    },
    {
      text: '前1个月',
      onClick: () => {
        const today = qDate.adjustDate(new Date(), {hour: 0, minute: 0, second: 0});
        return qDate.subtractFromDate(today, {month: 1})
      },
    },
  ]
};

const pickerValue = ref(null);
const {date} = toRefs(props);
pickerValue.value = date.value;

const onDateUpdate = (val) => {
  emit('update:date', val || '')
}
</script>
