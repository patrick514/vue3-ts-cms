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

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
  })
}

export function editUserData(userInfo: any,id:number) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
  })
}

