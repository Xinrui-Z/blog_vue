import { defineStore } from "pinia"
import { reqPostLogin } from "@/api/index.ts"
import { User } from "@/types/type"
import router from '@/router'
import { ElMessage} from "element-plus";

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

    }
})