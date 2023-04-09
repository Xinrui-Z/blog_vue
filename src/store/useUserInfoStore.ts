import { defineStore } from "pinia"
import { reqPostLogin, reqGetAdminInfo, reqPostBasicInfo, reqPutPwd, reqGetUserInfo } from "@/api/index.ts"
import { User } from "@/types/type"
import router from '@/router'
import { ElMessage} from "element-plus"

export const useUserInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            admin: {} ,
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

        // 获取用户信息 -- admin
        getAdminInfo() {
            reqGetAdminInfo().then(res => {
                this.admin = res.data.data.user
            }).catch(err => Promise.reject(err))
        },

        // 修改基本信息
        postBasicInfo(data: User) {
            reqPostBasicInfo(data).then(res => {
                ElMessage.success(res.data.message)
                this.getAdminInfo()
            }).catch(err => Promise.reject(err))
        },

         // 修改密码
         putPwd(pwd: string) {
            reqPutPwd(pwd).then(res => {
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取用户信息
        getUserInfo() {
            reqGetUserInfo().then(res => {
                this.user = res.data.data.users[0]
            }).catch(err => Promise.reject(err))
        }

    }
})