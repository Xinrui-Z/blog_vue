<template>
    <PageCard page-title="Articles" page-description="hahhah"/>
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="articles">
            <ArticleCardList />
        </div>
      </el-col>
    </el-row>
    <el-pagination layout="prev, pager, next" 
        v-model:current-page="page" v-model:page-size="pageSize" :total="articleList.total" 
        @current-change="handleCurrentChange"
    />
</template>

<script lang="ts" setup>
    import router from '@/router'
    import { ref, reactive, computed } from 'vue'
    import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
    import PageCard from '@/views/foreground/components/PageImgCard.vue'
    import { useArticleStore } from '@/store/useArticleStore.ts'

    let page = ref(1)
    let pageSize = ref(6)

    let store = useArticleStore()
    const articleList = computed(() => store.articleList)

    const handleCurrentChange = () => {
        store.getArticles(page.value, pageSize.value)
    }
</script>

<style scoped>
    /* articles */
    .articles {
        margin: 36px;
    }

    .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }
</style>