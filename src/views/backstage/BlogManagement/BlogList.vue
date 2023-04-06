<template>
    <h2>我的博客</h2>
    <el-table :data="articleList" border stripe style="width: 100%">
        <el-table-column prop="updateTime" label="Date" width="200" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="label" label="Label" width="150">
            <template #default="scope">
                <el-tag>{{scope.row.label}}</el-tag>
              </template>
        </el-table-column>
        <el-table-column label="Operations" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang='ts'>
    import { ref, reactive, toRaw, computed } from 'vue'
    import { Article } from '@/types/type'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import BlogEditPanel from '@/views/backstage/component/BlogEditPanel.vue'
    import router from '@/router'

    const store = useArticleStore()
    store. getArticles(1, 15)
    const articleList = computed(() => store.articleList)


    const handleEdit = (index: number, row: Article) => {
        router.push({
            path: '/backstage/index/manage/edit',
            query: {
                id: row.id
            }
        })
        console.log(index, row)
    }
    const handleDelete = (index: number, row: Article) => {
        store.deletArticle(row.id)
    }

</script>

<style scoped>

</style>