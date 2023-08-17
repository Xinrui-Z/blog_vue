import { defineStore } from "pinia";
import { reqPostPaper, reqGetPapers, reqPutPaper, reqGetPaperById, reqGetPaperByLabel, reqDeletePaper, reqGetLabelsPaperAndCount } from "@/api/index.ts";
import { Paper } from '@/types/type';
import router from '@/router';
import { ElMessage } from "element-plus";

export const usePaperStore = defineStore('paper', {
    state: () => {
        return {
            paper: {} as Paper,
            paperList: [],
            labelList: []
        };
    },
    actions: {
        // 添加文献
        postPaper(data: Paper) {
            reqPostPaper(data).then(res => {
                this.getPapers(1, 15);
                ElMessage.success(res.data.message);
            }).catch(err => Promise.reject(err));
        },

        // 获取文献列表
        getPapers(page: number, pageSize: number) {
            reqGetPapers(page, pageSize).then(res => {
                this.paperList = res.data.data;
            }).catch(err => Promise.reject(err));
        },

        // 修改文献
        putPaper(data: Paper) {
            reqPutPaper(data).then(res => {
                ElMessage.success(res.data.message);
            }).catch(err => Promise.reject(err));
        },

        // 获取文献 -- id
        getPaperById(aid: any) {
            reqGetPaperById(aid).then(res => {
                this.paper = res.data.data.paper;
            }).catch(err => Promise.reject(err));
        },

        // 删除文献 -- id
        deletePaper(aid: string) {
            reqDeletePaper(aid).then(res => {
                this.getPapers(1, 15);
                ElMessage.success(res.data.message);
            }).catch(err => Promise.reject(err));
        },

        // 获取标签
        getLabelsAndCount() {
            reqGetLabelsPaperAndCount().then(res => {
                this.labelList = res.data.data.labels;
            });
        },

        // 获取文献 -- label
        getPaperByLabel(label: string) {
            console.log("Calling getPaperByLabel with label:", label);
            console.log('Fetched papers:', this.paperList);
            reqGetPaperByLabel(label)
                .then(res => {
                    console.log('Fetched papers:', this.paperList);
                    console.log("Response data:", res.data);
                    this.paperList = res.data.data.papers;
                })
                .catch(err => {
                    console.error("Error in getPaperByLabel:", err);
                    return Promise.reject(err);
                });
        },
    }
});
