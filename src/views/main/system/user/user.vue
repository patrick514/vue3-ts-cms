<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></userSearch>
    <userContent ref="contentRef" @new-click="handleNewBtnClick" @edit-click="handleEditBtnClick"></userContent>
    <userModal ref="modalRef"></userModal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import userModal from './c-cpns/user-modal.vue'
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
const contentRef = ref<InstanceType<typeof userContent>>()
const handleQueryClick = (searchForm: any) => {
  contentRef.value?.fetchUserListData(searchForm)
}

const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}

const modalRef = ref<InstanceType<typeof userModal>>()
const handleNewBtnClick = () =>{
  modalRef.value?.setModalVisible(true)
}
const handleEditBtnClick = (rowData:any) =>{
  modalRef.value?.setModalVisible(false,rowData)
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
