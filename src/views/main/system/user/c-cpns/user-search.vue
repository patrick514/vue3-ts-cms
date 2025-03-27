<template>
  <div class="search">
    <el-form label-width="80px" ref="formRef" size="large" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名"></el-input>
          </el-form-item> </el-col
        ><el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone"  placeholder="请输入查询的电话号码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" size="large" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: '',
})

const emit = defineEmits(['queryClick','resetClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  formRef.value?.resetFields()

  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick',searchForm)
}
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .btn {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
