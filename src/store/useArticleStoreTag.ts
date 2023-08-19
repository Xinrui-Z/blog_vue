import { defineStore } from "pinia"
import { reqPostArticle, reqGetArticles, reqPutArticle, reqPutArticleImg, reqGetArticleById, reqGetArticleByLabel, reqDeleteArticle, reqGetLabelsAndCount, reqPostArticleImg } from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"
import {nextTick, ref} from 'vue'

export const useArticleStoreTag = defineStore('article', {
    state: () => {
        return {
            article: {} as Article,
            articleList: ref([]),
            labelList: [],
            articleListTotal: 0, // 添加文章总数属性
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

        // 图片上传
        postArticleImg(file: any) {
            return reqPostArticleImg(file)
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
        async getArticleByLabel(label: string) {
            console.log("getArticleByLabel called with label:", label);

            try {
                const response = await reqGetArticleByLabel(label);
                console.log("Response :", response);
                console.log("Response data:", response.data);

                // 确保 response.data.data.articles 是正确的数组
                if (Array.isArray(response.data.data.articles)) {
                    this.articleList = response.data.data.articles;
                } else {
                    console.error("Invalid articles data:", response.data.data.articles);
                }

                // 将路由跳转放在 nextTick 中
                nextTick(() => {
                    router.push({ name: 'tagsArticle', params: { label: label } });
                });
            } catch (error) {
                console.error("Error in getArticleByLabel:", error.message);
            }
        },



    }
})