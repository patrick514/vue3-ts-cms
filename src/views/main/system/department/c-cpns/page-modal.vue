<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import userMainStore from '@/store/main/main'
import userSystemStore from '@/store/main/system/system'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const dialogVisible = ref(false)

const mainStore = userMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
let isNewRef = ref(true)
const editData = ref()
const setModalVisible = (isNew: boolean, rowData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && rowData) {
    for (const key in formData) {
      formData[key] = rowData[key]
    }
    editData.value = rowData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

const systemStore = userSystemStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department',formData, editData.value.id)
  } else {
    systemStore.newPageDataAction('department',formData)
  }
}

defineExpose({
  setModalVisible,
})
</script>
<style lang="less" scoped>
.form {
  padding: 20px;
}
</style>
