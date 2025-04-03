<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <ChartCard header="分类商品数量（饼图）">
          <PieEchart :pie-data="showGoodsCategoryCount"></PieEchart>
        </ChartCard>
      </el-col>
      <el-col :span="10">
        <ChartCard header="不同城市销量">
          <mapEchart :map-data="showGoodsAddressSale"></mapEchart>
        </ChartCard>
      </el-col>
      <el-col :span="7">
        <ChartCard header="分类商品数量（玫瑰图）">
          <roseEchart :rose-data="showGoodsCategoryCount"></roseEchart>
        </ChartCard>
      </el-col>
    </el-row>

    <!-- 底部 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <ChartCard header="分类商品的销量">
          <LineEchart v-bind="showGoodsCategorySale"></LineEchart>
        </ChartCard>
      </el-col>
      <el-col :span="12">
        <ChartCard header="分类商品的收藏">
          <barEchart v-bind="showGoodsCategoryFavor" />
        </ChartCard>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import countCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import { LineEchart, PieEchart, roseEchart } from '@/components/page-echarts'
import {barEchart,mapEchart} from '@/components/page-echarts/index'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }))
})
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
