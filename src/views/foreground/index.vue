<template>
    <el-row>
        <el-col :span="24">
            <div class="info-card">
                <img src="@/assets/images/indexbackground.jpg" class="info-card-avatar"/>
                <p class="info-card-nickname">{{user.nickName}}</p>
                <p class="info-card-sign">{{user.sign}}</p>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="connect">
                <p class="item-title">Connect</p>
                <el-link :icon="StarFilled" type="primary" class="connect-link">Github: {{user.github}}</el-link>
                <el-link :icon="Message" type="info" class="connect-link">Email: {{user.email}}</el-link>
            </div>
            <div class="tags">
                <p class="item-title">Tags</p>
                <el-badge :value="12" class="tags-item" v-for="(item, index) in 6" :key="index"
                    :type="tagType[index%4]">
                    <el-button>Leetcode</el-button>
                </el-badge>
            </div>
            <div class="articles">
                <p class="item-title">Recent Articles</p>
                <el-row justify="space-evenly" :gutter="50">
                    <el-col :lg="7" :md="16" v-for="article in articles" :key="article.id">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img :src="article.imgUrl" />
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
                <el-button round class="article-btn" @click="goArticles">Know More</el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { ref, reactive, computed } from 'vue'
    import { StarFilled, Message } from '@element-plus/icons-vue'
    import { useUserInfoStore } from '@/store/useUserInfoStore.ts'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import { User } from '@/types/type'
    import router from '@/router'

    let userStore = useUserInfoStore()
    let articleStore = useArticleStore()
    userStore.getUserInfo()
    articleStore.getArticles(1,6)
    const user = computed(() => userStore.user)
    const articles = computed(() => articleStore.articleList)

    const tagType = reactive(['success', 'info', 'warning', 'danger'])

    let goArticles = () => {
        router.push("/articles")
    }
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
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
    }
    .articles img {
        width: 100%;
        height: 260px;
    }

    .el-card {
        border-radius: 10px;
        margin: 26px auto;
    }

    .article-btn {
        color: #F2E6CE;
        background-color: #6E8B74;
        margin: 10px 0;
    }

    .article-btn:hover {
        color: #6E8B74;
        background-color: #F2E6CE;
    }
</style>