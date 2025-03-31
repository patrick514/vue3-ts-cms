<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="hanleNewPageClick">{{
        contentConfig.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <div style="display: flex; align-items: center; justify-content: center">
                  <el-icon><timer /></el-icon>
                  <span style="margin-left: 10px">{{ formatUTC(scope.row[item.prop]) }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="large"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="large"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
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
import { ref, reactive } from 'vue'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const emit = defineEmits(['newClick', 'editClick'])
const props = defineProps<IProps>()
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
  console.log(queryInfo)
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageListAction(props.contentConfig.pageName, id)
}

const handleEditBtnClick = (rowData: number) => {
  emit('editClick', rowData)
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
