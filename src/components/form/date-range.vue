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
import {ref} from "vue";

const props = defineProps({
  detail: {
    type: Boolean,
    default: false,
  },
  start: {
    type: String,
    default: ''
  },
  end: {
    type: String,
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
  default: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:start', 'update:end']);
const datePickerProps = {
  'range': true,
  'input-class': "text-subtitle2",
  'format': props.detail ? "YYYY-MM-DD HH:mm:ss" : 'YYYY-MM-DD',
  'value-type': "format",
  'type': props.detail ? 'datetime' : 'date',
  'placeholder': '开始时间 ~ 结束时间',
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
      onClick: () => {
        const date = new Date();
        return [
          qDate.adjustDate(date, {hour: 0, minute: 0, second: 0}),
          qDate.adjustDate(date, {hour: 23, minute: 59, second: 59}),
        ]
      }
    },
    {
      text: '昨天',
      onClick: () => {
        const date = new Date();
        const start = qDate.adjustDate(date, {hour: 0, minute: 0, second: 0});
        const end = qDate.adjustDate(date, {hour: 23, minute: 59, second: 59});
        return [
          qDate.subtractFromDate(start, {day: 1}),
          qDate.subtractFromDate(end, {day: 1}),
        ]
      },
    },
    {
      text: '前1个礼拜',
      onClick: () => {
        const date = new Date();
        const start = qDate.adjustDate(date, {hour: 0, minute: 0, second: 0});
        const end = qDate.adjustDate(date, {hour: 23, minute: 59, second: 59});
        return [
          qDate.subtractFromDate(start, {day: 7}),
          qDate.subtractFromDate(end, {day: 7}),
        ]
      },
    },
    {
      text: '前1个月',
      onClick: () => {
        const date = new Date();
        const start = qDate.adjustDate(date, {hour: 0, minute: 0, second: 0});
        const end = qDate.adjustDate(date, {hour: 23, minute: 59, second: 59});
        return [
          qDate.subtractFromDate(start, {month: 1}),
          qDate.subtractFromDate(end, {month: 1}),
        ]
      },
    },
  ]
};

const pickerValue = ref(null);
pickerValue.value = [props.start, props.end];

const setDefaultTime = () => {
  const today = qDate.adjustDate(new Date(), {hour: 0, minute: 0, second: 0});
  pickerValue.value = []
  if (props.default === 'yesterday') {
    const start = qDate.formatDate(
      qDate.subtractFromDate(today, {hours: 24}),
      props.detail ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    )
    const end = qDate.formatDate(
      qDate.subtractFromDate(today, {second: 1}),
      props.detail ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    )
    pickerValue.value = [start, end];
    emit('update:start', start);
    emit('update:end', end);
  }else if(props.default === 'today'){
    const start = qDate.formatDate(
      today,
      props.detail ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    )
    const end = qDate.formatDate(
      qDate.adjustDate(today, { hour: 23, minute: 59 ,second:59}),
      props.detail ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    )
    pickerValue.value = [start, end];
    emit('update:start', start);
    emit('update:end', end);
  }
}

const onDateUpdate = (val, type) => {
  if (type === 'date') {
    const newVal = val.map((val, i) => {
      if (i === 0) return val;
      const lastTime = qDate.adjustDate(new Date(val), {hours: 23, minutes: 59, seconds: 59});
      const lastTimeStr = qDate.formatDate(lastTime, 'YYYY-MM-DD HH:mm:ss')
      return lastTimeStr;
    })
    pickerValue.value = newVal;
    emit('update:start', val[0] || '');
    emit('update:end', val[1] || '');
  } else {
    emit('update:start', val[0] || '');
    emit('update:end', val[1] || '');
  }
}

setDefaultTime();
</script>
