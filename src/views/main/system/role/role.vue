<template>
  <div class="role">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    >
    </pageContent>
    <pageModal :modal-config="modalConfig" ref="modalRef"></pageModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import userMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal()

// 获取完整的菜单
// const mainStore = userMainStore()
// const { entireMenus } = storeToRefs(mainStore)
// const otherInfo = ref({})
// function handleElTreeCheck(data1: any, data2: any) {
//   const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
//   console.log(data2.checkedKeys)
//   otherInfo.value = { menuList }
// }

// const treeRef = ref<InstanceType<typeof ElTree>>()
// function editCallback(itemData: any) {
//   nextTick(() => {
//     const menuIds = mapMenuListToIds(itemData.menuList)
//     treeRef.value?.setCheckedKeys(menuIds)
//   })
// }
</script>
<style lang="less" scoped></style>
