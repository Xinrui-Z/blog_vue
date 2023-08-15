import { defineStore } from "pinia"
import { reqPostPaper, reqGetPapers, reqPutPaper, reqGetPaperById, reqGetPaperByLabel, reqDeletePaper, reqGetLabelsPaperAndCount} from "@/api/index.ts"
import { Paper } from '@/types/type'
import router from '@/router'
import { ElMessage } from "element-plus"

export const usePaperStore = defineStore('paper', {
    state: () => {
        return {
            paper: {} as Paper,
            paperList: [],
            papers: [], // about me
            labelList: []
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
                this.labelList = res.data.data.labels
            })
        },

        // 获取文献 -- label
// 获取文献 -- label
        getPaperByLabel(label: string) {
            console.log("Calling getPaperByLabel with label:", label); // 添加这行
            reqGetPaperByLabel(label)
                .then(res => {
                    console.log("Response data:", res.data); // 添加这行
                    this.papers = res.data.data.papers;
                })
                .catch(err => {
                    console.error("Error in getPaperByLabel:", err); // 添加这行
                    return Promise.reject(err);
                });
        },

    }
})