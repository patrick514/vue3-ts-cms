import { deleteUserById, postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type {  ISystemState } from './type'



const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount:0,
  }),

  actions: {
    async postUserListAction(info:any) {
      const usersListResult = await postUserListData(info)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id:number){
      const delteResult = await deleteUserById(id)
      console.log(delteResult)
      this.postUserListAction({offset:0,size:10})
    }
  },
})

export default userSystemStore
