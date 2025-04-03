<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="hanleNewPageClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="60px"></el-table-column>
        <el-table-column align="center" label="部门名称" width="150">
          <template #default="scope">
            <el-text type="primary">{{ scope.row.name }}</el-text>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="leader" label="部门领导" width="150" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="150" />
        <!-- <el-table-column prop="enable" align="center" label="状态" width="80">
          <template #default="scope">
            <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ formatUTC(scope.row.createAt) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ formatUTC(scope.row.updateAt) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template #default="scope">
            <el-button icon="Edit" text type="primary" @click="handleEditBtnClick(scope.row)">编辑</el-button>
            <el-button icon="Delete" text type="danger" @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout=" sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import userSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits(['newClick','editClick'])

const systemStore = userSystemStore()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

const currentPage = ref(1)
const pageSize = ref(10)

const handleSizeChange = () => {
  fetchPageListData()
}

const handleCurrentChange = () => {
  fetchPageListData()
}

const fetchPageListData = (searchForm: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageinfo = { size, offset }

  const queryInfo = { ...pageinfo, ...searchForm }

  systemStore.postPageListAction('department',queryInfo)
}

const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageListAction('department',id)
}

const handleEditBtnClick = (rowData:number)=>{
  emit('editClick',rowData)

}
const hanleNewPageClick = () => {
  emit('newClick')
}

fetchPageListData()
defineExpose({
  fetchPageListData,
})
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
