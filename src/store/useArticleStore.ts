import { defineStore } from "pinia"
import { reqPostArticle, reqGetArticles, reqPutArticle, reqGetArticle, reqDeleteArticle } from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'
import { ElMessage} from "element-plus"

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            article: {},
            articleList: []
        }
    },
    actions: {
        // 添加博客
        addArticle(data: Article) {
            reqPostArticle(data).then(res => {
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取博客列表
        getArticles(page: number, pageSize: number) {
            reqGetArticles(page, pageSize).then(res => {
                this.articleList = res.data.data.articles
            }).catch(err => Promise.reject(err))
        },

        // 修改博客
        putArticle(data: Article) {
            reqPutArticle(data).then(res => {
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取博客 -- id
        getArticle(aid: any) {
            reqGetArticle(aid).then(res => {
                this.article = res.data.data.article
            }).catch(err => Promise.reject(err))
        },

        // 删除博客 -- id
        deletArticle(aid: any) {
            reqDeleteArticle(aid).then(res => {
                this.getArticles(1,15)
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        }

    }
})