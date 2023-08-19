import { defineStore } from "pinia"
import {
    reqPostPaper,
    reqGetPapers,
    reqPutPaper,
    reqGetPaperById,
    reqGetPaperByLabel,
    reqDeletePaper,
    reqGetLabelsPaperAndCount
} from "@/api/index.ts"
import { Paper } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"
import {nextTick, ref} from 'vue'

export const usePaperStore = defineStore('paper', {
    state: () => {
        return {
            paper: {} as Paper,
            paperList: ref([]),
            labelList: [],
            paperListTotal: 0, // 添加文章总数属性
        }
    },
    actions: {
        // 添加文献
        postPaper(data: Paper) {
            reqPostPaper(data).then(res => {
                this.getPapers(1, 15)
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取文献列表
        getPapers(page: number, pageSize: number) {
            reqGetPapers(page, pageSize).then(res => {
                this.paperList = res.data.data
            }).catch(err => Promise.reject(err))
        },

        // 修改文献
        putPaper(data: Paper) {
            reqPutPaper(data).then(res => {
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取文献 -- id
        getPaperById(aid: any) {
            reqGetPaperById(aid).then(res => {
                this.paper = res.data.data.paper
            }).catch(err => Promise.reject(err))
        },

        // 删除文献 -- id
        deletPaper(aid: string) {
            reqDeletePaper(aid).then(res => {
                this.getPapers(1, 15)
                ElMessage.success(res.data.message)
            }).catch(err => Promise.reject(err))
        },

        // 获取标签
        getLabelsAndCount() {
            reqGetLabelsPaperAndCount().then(res => {
                this.labelList = res.data.data.labels;
            })
        },

        async getPaperByLabel(label: string) {
            console.log("getPaperByLabel called with label:", label);

            try {
                console.log("Token in localStorage:", localStorage.getItem("token"));
                const paperListBackup = this.paperList.value; // 备份 paperList

                const response = await reqGetPaperByLabel(label);
                console.log("Response:", response);

                const responseData = response // 使用 response.data.data 来获取正确的数组
                console.log("Response data:", responseData);

                console.log("Is array:", Array.isArray(responseData));
                console.log("Length:", responseData.length);

                // 确保 responseData 是正确的数组
                if (Array.isArray(responseData)) {
                    this.paperList.value = responseData; // 更新 paperList 的值
                    this.paperListTotal = responseData.length; // 更新 paperListTotal
                    console.log("paperList getPaperByLabel", this.paperList);
                } else {
                    console.error("Invalid papers data:", responseData);
                    this.paperList.value = paperListBackup; // 恢复备份的 paperList
                }

                // 将路由跳转放在 nextTick 中
                nextTick(() => {
                    router.push({ name: 'tagsPaper', params: { label: label } });
                });
            } catch (error) {
                console.error("Error in getPaperByLabel:", error.message);
            }
        },



    }
})