import { defineStore } from "pinia"
import { reqGetMessages, reqPostMessage } from "@/api/index.ts"
import { Message } from '@/types/type'
import { ElMessage } from "element-plus"

export const useMessageStore = defineStore('message', {
    state: () => {
        return {
            messageList: []
        }
    },
    actions: {
        // 添加留言
        postMessage(data: Message) {
            reqPostMessage(data).then(res => {
                ElMessage.success(res.data.message)
                this.getMessages()
            }).catch(err => Promise.reject(err))
        },
        
        // 获取留言列表
        getMessages() {
            reqGetMessages().then(res => {
                this.messageList = res.data.data.messages
            }).catch(err => Promise.reject(err))
        }
    }
})