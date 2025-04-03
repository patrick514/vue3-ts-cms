import type { IAccount } from '@/types/login'
import hyRequest from '..'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}

export function getUserInfoById(id: number) {
  // const headers = new AxiosHeaders()
  // headers.set('Authorization', localCache.getCache(LOGIN_TOKEN))

  return hyRequest.get({
    url: `/users/${id}`,
    // headers,
  })
}

export function getUserMenuByRoleId(id:number){
  return hyRequest.get({
    url: `/role/${id}/menu`,
    // headers,
  })
}
