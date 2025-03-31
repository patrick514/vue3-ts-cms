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


export function postPageListData(pageName:string,queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}

export function deletePageById(pageName:string,id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  })
}

export function newPageData(pageName:string,pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
  })
}

export function editPageData(pageName:string,pageInfo: any, id: number) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
  })
}
