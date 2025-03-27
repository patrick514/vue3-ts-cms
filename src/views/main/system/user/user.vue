<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></userSearch>
    <userContent ref="contentRef"></userContent>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
const contentRef = ref<InstanceType<typeof userContent>>()
const handleQueryClick = (searchForm: any) => {
  contentRef.value?.fetchUserListData(searchForm)
}

const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
