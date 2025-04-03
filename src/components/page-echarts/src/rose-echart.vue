<template>
  <div class="rose-echart">
    <baseEchart :option="option"></baseEchart>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import baseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'

interface IProps {
  roseData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    label: {
      show: false,
    },
    emphasis: {
      label: {
        show: true,
      },
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 160],
        // 设置区域的位置
        center: ['50%', '50%'],
        bottom: '10%',
        roseType: 'area', // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
        label: {
          show: false,
        },
      },
    ],
  }
})
</script>
<style lang="less" scoped></style>
