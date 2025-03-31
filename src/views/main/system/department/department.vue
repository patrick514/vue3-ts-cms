<template>
  <div class="department">
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
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </pageContent>
    <pageModal :modal-config="modalConfigRef" ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import { computed, ref } from 'vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import userMainStore from '@/store/main/main'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal()
// 修改 department.vue 中的 modalConfigRef 计算属性
const modalConfigRef = computed(() => {
  const mainStore = userMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })

  // 创建一个深拷贝以避免修改原始配置
  const modalConfigCopy = JSON.parse(JSON.stringify(modalConfig))

  // 更新 parentId 的选项
  modalConfigCopy.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      // 确保 options 是空数组然后添加最新的部门数据
      item.options = [...departments]
    }
  })

  return modalConfigCopy
})
</script>

<style scoped>
.department {
}
</style>
