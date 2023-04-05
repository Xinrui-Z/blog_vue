import { defineStore } from "pinia"
import { reqPostArticle, reqGetArticleList, reqPutArticle, reqGetArticle } from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            articleList: [],
            article: {}
        }
    },
    actions: {
        // 添加博客
        addArticle(data: Article) {
            reqPostArticle(data).then(res => {
            }).catch(err => Promise.reject(err))
        },

        // 获取博客列表
        getArticleList() {
            reqGetArticleList().then(res => {
                this.articleList = res.data.data.articles
            }).catch(err => Promise.reject(err))
        },

        // 修改博客
        putArticle(data: Article) {
            reqPutArticle(data).then(res => {
                console.log('修改博客',res)
            }).catch(err => Promise.reject(err))
        },

        // 获取博客信息
        getArticle(aid: any) {
            reqGetArticle(aid).then(res => {
                this.article = res.data.data.article
                console.log("获取博客信息", res)
            }).catch(err => Promise.reject(err))
        }

    }
})