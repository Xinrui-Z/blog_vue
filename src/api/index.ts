import {request} from '@/api/http'
import { User, Article } from '@/types/type'
import axios from 'axios'
 
// 登录
export function reqPostLogin(data: User) {
    return request({
        url: '/login',
        data,
        method:'post'
      })
}

// 获取用户信息
export function reqGetUserInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

// 修改昵称和个签
export function reqPutNickAndSign(data: User) {
  return request({
    url: `/nickAndSign/${data.nickName}/${data.sign}`,
    method: 'put'
  })
}

// 修改密码
export function reqPutPwd(pwd: string) {
  return request({
    url: `/password/${pwd}`,
    method: 'put'
  })
}

// 添加文章
export function reqPostArticle(data: Article) {
  console.log('data',data)
  return request({
    url: '/article/articles',
    data,
    method: 'post'
  })
}