import { defineStore } from "pinia"
import { reqPostLogin, reqGetUserInfo, reqPutNickAndSign, reqPutPwd } from "@/api/index.ts"
import { User } from "@/types/type"
import router from '@/router'
import { ElMessage} from "element-plus"

export const useUserInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        // 登录
        login(data: User) {
            reqPostLogin(data).then(res => {
                sessionStorage.setItem('TOKEN', res.headers.token)
                router.push('/backstage/index')
            }).catch(err => {
                ElMessage.error(err.message)
                Promise.reject(err)
            })
        },

        // 获取用户信息
        getUserInfo() {
            reqGetUserInfo().then(res => {
                console.log(res)
                this.user = res.data.data.user
            }).catch(err => Promise.reject(err))
        },

        // 修改昵称和个签
        putNickAndSign(data: User) {
            console.log("nick0",data)
            reqPutNickAndSign(data).then(res => {
                console.log("xiugainicheng",res)
            }).catch(err => Promise.reject(err))
        },

         // 修改密码
         putPwd(pwd: string) {
            console.log("pwd",pwd)
            reqPutPwd(pwd).then(res => {
                console.log("修改密码",res)
            }).catch(err => Promise.reject(err))
        }

    }
})