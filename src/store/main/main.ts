import { getEntireDepartments, getEntireMenus, getEntireRoles } from "@/service/main/main"
import { defineStore } from "pinia"


interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus:any[]
}

const userMainStore = defineStore('main',{
  state: () : IMainState => ({
    entireRoles:[],
    entireDepartments:[],
    entireMenus:[]
  }),

  actions:{
    async fetchEntireDataAction(){
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()

      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default userMainStore
