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

// 添加文章
export function reqPostArticle(data: Article) {
  console.log('data',data)
  return request({
    url: '/article/articles',
    data,
    method: 'post'
  })
}