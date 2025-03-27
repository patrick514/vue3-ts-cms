<template>
  <div class="">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{path:item.path}">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = userLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>
<style lang="less" scoped></style>
