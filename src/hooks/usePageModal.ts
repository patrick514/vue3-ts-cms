import { ref } from "vue"
import pageModal from "@/components/page-modal/page-modal.vue"
export function usePageModal(){

  const modalRef = ref<InstanceType<typeof pageModal>>()
  const handleNewBtnClick = (rowData: any) => {
    modalRef.value?.setModalVisible(true, rowData)
  }

  const handleEditBtnClick = (rowData: any) => {
    modalRef.value?.setModalVisible(false, rowData)
  }

  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick
  }
}
