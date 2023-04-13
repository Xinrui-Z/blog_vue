<template>
    <div class="background-div">
        <h1 class="animate__animated animate__fadeInDownBig" style="font-size:36px">About me</h1>
    </div>
    <el-row justify="space-evenly">
        <el-col :xs="20" :lg="6" :md="12" v-for="article in articles" :key="article.id" :gutter="50">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="goArticleDetail(article.id)">
                <img :src="'data:image/jpeg;base64,'+article.imgUrl" class="article-img" />
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

<script setup lang='ts'>
    import { ref, computed } from 'vue'
    import { useArticleStore } from '@/store/useArticleStore'
    import { Clock } from '@element-plus/icons-vue'
    import router from '@/router'

    const articleStore = useArticleStore()
    let label = ref('myself')

    articleStore.getArticleByLabel(label.value)
    const articles = computed(() => articleStore.articles)

    const goArticleDetail = (aid: String) => {
        console.log('hhhhhhh')
        router.push({
            path: '/articles/detail',
            query: {
                id: aid
            }
        })
    }

</script>

<style scoped>
    /* Phone */
    @media screen and (max-width: 993px) {
        .background-div {
            height: 300px;
        }
    }

    /* PC */
    @media screen and (min-width: 992px) {
        .background-div {
            height: 460px;
        }
    }

    .background-div {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: white;
        border-radius: 10px;
        background: url("https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
    }

    .el-row {
        margin: 60px 0;
    }

    /* articles */
    .article-img {
        width: 100%;
        height: 260px;
        background-size: cover;
    }

    .article-title {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    .article-digest {
        font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    }

    .article-time {
        font: 13px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    }

    .el-card {
        width: 100%;
        border-radius: 10px;
        margin: 26px auto;
    }

    .el-tag {
        color: #584717;
    }
</style>