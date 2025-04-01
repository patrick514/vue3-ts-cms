import { ref } from "vue"
import pageModal from "@/components/page-modal/page-modal.vue"

type EditFnType = (data: any) => void


export function usePageModal(editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  const handleNewBtnClick = (rowData: any) => {
    modalRef.value?.setModalVisible(true, rowData)
  }

  const handleEditBtnClick = (rowData: any) => {
    modalRef.value?.setModalVisible(false, rowData)
  
    // 2.编辑的回调
    if (editCallback) editCallback(rowData)
  }

  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick,
  }
}
