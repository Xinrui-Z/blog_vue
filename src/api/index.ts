import { request } from '@/api/http'
import { User, Article, Message, Paper } from '@/types/type'
import axios from 'axios'

// 登录
export function reqPostLogin(data: User) {
  return request({
    url: '/admin/login',
    data,
    method: 'post'
  })
}

// 获取用户信息 -- id
export function reqGetAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

// 修改基本信息
export function reqPostBasicInfo(data: User) {
  return request({
    url: `/admin/info`,
    data,
    method: 'post'
  })
}

// 修改密码
export function reqPutPwd(pwd: string) {
  return request({
    url: `/admin/password/${pwd}`,
    method: 'put'
  })
}

// 添加博客
export function reqPostArticle(data: Article) {
  return request({
    url: `/article/addarticle`,
    data,
    method: 'post',
  })
}

// 添加文献
export function reqPostPaper(data: Paper) {
  return request({
    url: `/paper/addpaper`,
    data,
    method: 'post',
  })
}

// 上传图片
export function reqPostArticleImg(data: any) {
  let options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return request({
    url: `/article/addarticleimg`,
    method: 'post',
    data,
    options
  })
}

// 获取博客列表
export function reqGetArticles(page: number, pageSize: number) {
  return request({
    url: `/front/articles/${page}/${pageSize}`,
    method: 'get'
  })
}

// 修改博客
export function reqPutArticle(data: Article) {
  return request({
    url: '/article/article',
    data,
    method: 'post',
  })
}

// 获取博客 -- 根据id
export function reqGetArticleById(aid: long) {
  return request({
    url: `/front/article/${aid}`,
    method: 'get',
  })
}

// 获取博客 -- 根据label
// export async function reqGetArticleByLabel(label: string) {
//   try {
//     const response = await request({
//       url: `/front/tagsArticle/${label}`,
//       method: 'get',
//     });
//
//     return response;
//   } catch (error) {
//     console.error("An error occurred while fetching articles by label:", error);
//     throw new Error("Failed to fetch articles by label"); // Return a standardized error object
//   }
// }

// 获取博客 -- 根据label
export function reqGetUser(label: string) {
  return request({
    url: `/front/about/${label}`,
    method: 'get',
  })
}

export async function reqGetArticleByLabel(label: string) {
  try {
    const token = localStorage.getItem("token");
    console.log("Token in reqGetArticleByLabel:", token); // Add this line
    const response = await axios.get(`/front/tagsArticle/${label}`, {
      headers: {
        'token': token
      }
    });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in reqGetArticleByLabel:", error.message);
    console.error("Error response:", error.response);
    throw new Error("Request to get articles by label failed.");
  }
}



// 删除博客 -- 根据id
export function reqDeleteArticle(aid: long) {
  return request({
    url: `/article/deletearticle/${aid}`,
    method: 'delete'
  })
}



// 获取文献列表
export function reqGetPapers(page: number, pageSize: number) {
  return request({
    url: `/front/papers/${page}/${pageSize}`,
    method: 'get'
  })
}

// 修改博客
export function reqPutPaper(data: Article) {
  return request({
    url: '/paper/paper',
    data,
    method: 'post',
  })
}

// 获取文献 -- 根据id
export function reqGetPaperById(aid: long) {
  return request({
    url: `/front/paper/${aid}`,
    method: 'get',
  })
}

// 获取文献 -- 根据label
export async function reqGetPaperByLabel(label: string) {
  try {
    const token = localStorage.getItem("token");
    console.log("Token in reqGetPaperByLabel:", token); // Add this line
    const response = await axios.get(`/front/tagsPaper/${label}`, {
      headers: {
        'token': token
      }
    });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in reqGetPaperByLabel:", error.message);
    console.error("Error response:", error.response);
    throw new Error("Request to get papers by label failed.");
  }
}


// 删除博客 -- 根据id
export function reqDeletePaper(aid: long) {
  return request({
    url: `/paper/deletepaper/${aid}`,
    method: 'delete'
  })
}

// 获取用户信息
export function reqGetUserInfo() {
  return request({
    url: '/front/user',
    method: 'get'
  })
}

// 获取标签
export function reqGetLabelsAndCount() {
  return request({
    url: '/front/labels',
    method: 'get'
  })
}

// 获取文献标签
export function reqGetLabelsPaperAndCount() {
  return request({
    url: '/front/labelsPaper',
    method: 'get'
  })
}

// 获取留言
export function reqGetMessages() {
  return request({
    url: '/front/messages',
    method: 'get'
  })
}

// 添加留言
export function reqPostMessage(data: Message) {
  return request({
    url: '/front/message',
    data,
    method: 'post'
  })


}
