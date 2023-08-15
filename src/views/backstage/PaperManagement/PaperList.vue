<template>
    <h2>我的阅读记录</h2>
    <el-table :data="paperList.papers" border stripe style="width: 100%">
        <el-table-column prop="updateTime" label="Date" width="200" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="label" label="Label" width="150">
            <template #default="scope">
                <el-tag type="success" effect="dark">{{scope.row.label}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Operations" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" 
        v-model:current-page="page" v-model:page-size="pageSize" :total="paperList.total" 
        @current-change="handleCurrentChange"
    />
</template>

<script setup lang='ts'>
    import { ref, reactive, toRaw, computed } from 'vue'
    import { Paper } from '@/types/type'
    import { usePaperStore } from '@/store/usePaperStore'
    import PaperEditPanel from '@/views/backstage/components/PaperEditPanel.vue'
    import router from '@/router'

    let page = ref(1)
    let pageSize = ref(10)

    const store = usePaperStore()
    store.getPapers(page.value, pageSize.value)
    const paperList = computed(() => store.paperList)

    const handleEdit = (index: number, row: Paper) => {
        router.push({
            path: '/backstage/index/manage/edit',
            query: {
                id: row.id
            }
        })
    }

    const handleDelete = (index: number, row: Paper) => {
        store.deletPaper(row.id)
    }

    const handleCurrentChange = () => {
        store.getPapers(page.value, pageSize.value)
    }

</script>

<style scoped>
 .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }
</style>