import { defineStore } from "pinia"
import { reqPostArticle, reqGetArticles, reqPutArticle, reqPutArticleImg, reqGetArticleById, reqGetArticleByLabel, reqDeleteArticle, reqGetLabelsAndCount } from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            article: {} as Article,
            articleList: [],
            articles: [], // about me
            labelList: []
        }
    },
    actions: {
        // 添加博客
        postArticle(data: Article) {
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
        getArticleById(aid: any) {
            reqGetArticleById(aid).then(res => {
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
        },

        // 获取博客 -- label
        getArticleByLabel(label: string) {
            reqGetArticleByLabel(label).then(res => {
                this.articles = res.data.data.articles
            }).catch(err => Promise.reject(err))
        },

    }
})