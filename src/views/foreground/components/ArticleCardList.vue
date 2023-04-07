<template>
    <el-row justify="space-evenly" :gutter="50">
        <el-col :lg="7" :md="16" v-for="article in articles" :key="article.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="'data:image/jpeg;base64,'+article.imgUrl" />
                <div style="padding: 14px">
                    <el-tag round>
                        {{article.label}}
                    </el-tag>
                    <p>{{article.title}}</p>
                    <p>{{article.digest}}</p>
                    <el-divider />
                    <span>{{article.updateTime}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import { useArticleStore } from '@/store/useArticleStore.ts'

    let articleStore = useArticleStore()

    articleStore.getArticles(1, 6)

    const articles = computed(() => articleStore.articleList.articles)

</script>

<style scoped>
    /* info */
    .info-card {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        background-repeat: repeat-x;
    }

    .info-card-avatar {
        width: 280px;
        height: 280px;
        border-radius: 50%;
    }

    .info-card-nickname {
        font: 2em x-large;
    }

    .info-card-sign {
        font: large bolder;
        font-family: serif;
    }

    .item-title {
        margin-bottom: 20px;
        font: large bolder Helvetica;
    }

    /* connect */
    .connect-link {
        margin: 10px 30px;
    }

    /* tags */
    .tags {
        margin-top: 30px;
    }

    .tags-item {
        margin: 20px;
    }

    /* articles */
    .articles {
        align-items: center;
    }

    .articles img {
        width: 100%;
        height: 260px;
        background-size: contain;
    }

    .el-card {
        width: 100%;
        border-radius: 10px;
        margin: 26px auto;
    }

    .article-btn {
        display: block;
        margin: 10px auto;
        color: #F2E6CE;
        background-color: #6E8B74;
    }

    .article-btn:hover {
        color: #6E8B74;
        background-color: #F2E6CE;
    }
</style>