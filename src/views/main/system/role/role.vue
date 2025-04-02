<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
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
    <pageModal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
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
import { mapMenuListToIds } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal(newCallback, editCallback)

const mainStore = userMainStore()
const { entireMenus } = storeToRefs(mainStore)
// 获取完整的菜单

const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]

  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)

    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>
<style lang="less" scoped></style>
