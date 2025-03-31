import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0,
  }),

  actions: {
    async postUserListAction(info: any) {
      const usersListResult = await postUserListData(info)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const delteResult = await deleteUserById(id)

      this.postUserListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)

      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(userInfo: any, id: number) {
      const editResult = await editUserData(userInfo, id)
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)

      const { totalCount, list } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageListAction(pageName: string, queryInfo: any) {
      const deleteListResult = await deletePageById(pageName, queryInfo)
      console.log(deleteListResult)
      const { totalCount, list } = deleteListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, pageInfo: any, id: number) {
      const editResult = await editPageData(pageName, pageInfo, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
  },
})

export default userSystemStore
