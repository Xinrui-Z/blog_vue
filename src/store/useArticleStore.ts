import { defineStore } from "pinia"
import { reqPostArticle } from "@/api/index.ts"
import { Article } from "@/types/type"
import router from '@/router'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
        }
    },
    actions: {
        // 添加博客
        addArticle(data: Article) {
            reqPostArticle(data).then(res => {
            }).catch(err => Promise.reject(err))
        }

    }
})