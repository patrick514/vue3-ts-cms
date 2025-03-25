import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '../../types/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const userLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? {},
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      // const name = loginResult.data.name
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      const userMenusResult = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      console.log(id)
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      console.log("menu"+userMenusResult.data)

      router.push('/main')
    },
  },
})

export default userLoginStore
