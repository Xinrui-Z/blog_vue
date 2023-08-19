import { defineStore } from "pinia"
import {
    reqPostArticle,
    reqGetArticles,
    reqPutArticle,
    reqPutArticleImg,
    reqGetArticleById,
    reqGetArticleByLabel,
    reqDeleteArticle,
    reqGetLabelsAndCount,
    reqPostArticleImg,
    reqGetUser
} from "@/api/index.ts"
import { Article } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"
import {nextTick, ref} from 'vue'

export const useArticleStore = defineStore('article', {
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
        getUser(label: string) {
            reqGetUser(label).then(res => {
                this.articles = res.data.data.articles
            }).catch(err => Promise.reject(err))
        },

        async getArticleByLabel(label: string) {
            console.log("getArticleByLabel called with label:", label);

            try {
                console.log("Token in localStorage:", localStorage.getItem("token"));
                const articleListBackup = this.articleList.value; // 备份 articleList

                const response = await reqGetArticleByLabel(label);
                console.log("Response:", response);

                const responseData = response // 使用 response.data.data 来获取正确的数组
                console.log("Response data:", responseData);

                console.log("Is array:", Array.isArray(responseData));
                console.log("Length:", responseData.length);

                // 确保 responseData 是正确的数组
                if (Array.isArray(responseData)) {
                    this.articleList.value = responseData; // 更新 articleList 的值
                    this.articleListTotal = responseData.length; // 更新 articleListTotal
                    console.log("articleList getArticleByLabel", this.articleList);
                } else {
                    console.error("Invalid articles data:", responseData);
                    this.articleList.value = articleListBackup; // 恢复备份的 articleList
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