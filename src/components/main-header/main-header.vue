<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <headerInfo />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
//自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  isFold.value = !isFold.value

  emit('foldChange',isFold.value)
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
