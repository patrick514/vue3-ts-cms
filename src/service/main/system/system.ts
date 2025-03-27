import hyRequest from '@/service'

export function postUserListData(info: any) {
  return hyRequest.post({
    url: '/users/list',
    data: info,
  })
}


export function deleteUserById(id:number){
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
