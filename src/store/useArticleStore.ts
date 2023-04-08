import { defineStore } from "pinia"
import { reqPostArticle, reqGetArticles, reqPutArticle, reqPutArticleImg, reqGetArticleById, reqDeleteArticle, reqGetLabelsAndCount } from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            article: {},
            articleList: [],
            labelList: []
        }
    },
    actions: {
        // 添加博客
        addArticle(data: Article) {
            reqPostArticle(data).then(res => {
                this.getArticles(1, 15)
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取博客列表
        getArticles(page: number, pageSize: number) {
            reqGetArticles(page, pageSize).then(res => {
                this.articleList = res.data.data
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
            reqGetArticleById(aid).then(res => {
                console.log(res.data.data.article)
                this.article = res.data.data.article
            }).catch(err => Promise.reject(err))
        },

        // 删除博客 -- id
        deletArticle(aid: string) {
            reqDeleteArticle(aid).then(res => {
                this.getArticles(1, 15)
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取标签
        getLabelsAndCount() {
            reqGetLabelsAndCount().then(res => {
                this.labelList = res.data.data.labels
            })
        }

    }
})