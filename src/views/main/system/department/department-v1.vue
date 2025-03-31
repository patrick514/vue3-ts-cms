<template>
  <div class="department">
    <pageSearch @query-click="handleQueryClick" @reset-click="handleResetClick"></pageSearch>
    <pageContent ref="contentRef" @new-click="handleNewBtnClick" @edit-click="handleEditBtnClick"></pageContent>
    <pageModal ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue';
import pageContent from './c-cpns/page-content.vue';
import { ref } from 'vue';
import pageModal from './c-cpns/page-modal.vue';
const contentRef = ref<InstanceType<typeof pageContent>>()
const handleQueryClick = (queryInfo:any)=>{
  contentRef.value?.fetchPageListData(queryInfo)
}

const handleResetClick = ()=>{
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
const handleNewBtnClick = (rowData:any) =>{
  modalRef.value?.setModalVisible(true,rowData)
}

const handleEditBtnClick = (rowData:any) =>{
  modalRef.value?.setModalVisible(false,rowData)

}
</script>

<style scoped>
.department {
}
</style>
