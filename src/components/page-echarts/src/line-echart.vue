<template>
  <div class="line-echart">
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  labels: string[]
  values: string[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.labels,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.values,
      },
    ],
  }
})

// const option = computed<EChartsOption>(() => {
//   return {
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         data: [820, 932, 901, 934, 1290, 1330, 1320],
//         type: 'line',
//         areaStyle: {},
//       },
//     ],
//   }
// })
</script>

<style lang="less" scoped></style>
