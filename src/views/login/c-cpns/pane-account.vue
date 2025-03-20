<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      label-width="60px"
      size="large"
      :model="account"
      :rules="accountRules"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { accountLoginRequest } from '@/service/login/login'
import { ElMessage } from 'element-plus'
import userLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/login'
const account = reactive<IAccount>({
  name: '',
  password: '',
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur',
    },
  ],
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = userLoginStore()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      // accountLoginRequest({name,password}).then((res) =>{
      //   console.log(res)
      // })
      loginStore.loginAccountAction({ name, password }).then(() => {})
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      // console.log('suc')
    } else {
      ElMessage.error('请您输入正确的格式')
      // console.log('feat')
    }
  })
}

defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
