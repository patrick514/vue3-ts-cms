<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname" required>
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import userMainStore from '@/store/main/main'
import userSystemStore from '@/store/main/system/system'

import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})
const dialogVisible = ref(false)

const mainStore = userMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const isNewRef = ref(true)
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
    systemStore.editUserDataAction(formData, editData.value.id)
  } else {
    systemStore.newUserDataAction(formData)
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
