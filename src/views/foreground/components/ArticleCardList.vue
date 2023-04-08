<template>
    <el-row justify="space-evenly" :gutter="50">
        <el-col :lg="7" :md="12" v-for="article in articles" :key="article.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="goArticleDetail(article.id)">
                <img :src="'data:image/jpeg;base64,'+article.imgUrl" class="article-img"/>
                <div style="padding: 14px">
                    <el-tag color="#f7f4ed">
                        {{article.label}}
                    </el-tag>
                    <p class="article-title">{{article.title}}</p>
                    <p class="article-digest">{{article.digest}}</p>
                    <el-divider />
                    <span class="article-time">{{article.updateTime}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import router from '@/router'

    let articleStore = useArticleStore()

    articleStore.getArticles(1, 6)

    const articles = computed(() => articleStore.articleList.articles)
    
    const goArticleDetail = (aid: String) => {
        router.push({
            path: '/articles/detail',
            query: {
                id: aid
            }
        })
    }

</script>

<style scoped>
    /* articles */
    .articles {
        align-items: center;
    }

    .article-img {
        width: 100%;
        height: 260px;
        background-size: cover;
    }

    .article-title {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    .article-digest {
        font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
    }

    .article-time {
        font: 13px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
    }

    .el-tag {
        color: #584717;
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