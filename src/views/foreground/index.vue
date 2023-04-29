<template>
    <Weather />
    <el-row>
        <el-col :span="24">
            <div class="info-card">
                <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="info-card-avatar" />
                <p class="info-card-nickname">{{user.nickName}}</p>
                <p class="info-card-sign">{{user.sign}}</p>
            </div>
        </el-col>
    </el-row>
    <el-row  justify="center">
        <el-col :xs="20" :sm="20" :md="20" :lg="16" >
            <div class="connect">
                <p class="item-title">Connect</p>
                <el-link :icon="StarFilled" class="connect-link" :href="user.github">Github: {{user.github}}</el-link>
                <el-link :icon="Message" class="connect-link" :href="'mailto:'+user.email">Email:
                    {{user.email}}</el-link>
            </div>
            <div class="tags">
                <p class="item-title">Tags</p>
                <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labels" :key="index"
                    :type="tagType[index%4]">
                    <el-button>{{item.label}}</el-button>
                </el-badge>
            </div>
            <div class="articles">
                <p class="item-title">Recent Articles</p>
                <ArticleCardList />
                <el-button round color="#b6bfaa" class="article-btn" @click="goArticles">
                    Know More
                </el-button>
            </div>

        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
    import Weather from '@/components/Weather.vue'
    import { ref, reactive, computed } from 'vue'
    import { StarFilled, Message } from '@element-plus/icons-vue'
    import { useUserInfoStore } from '@/store/useUserInfoStore'
    import { useArticleStore } from '@/store/useArticleStore'
    import { User } from '@/types/type'
    import router from '@/router'

    let userStore = useUserInfoStore()
    let articleStore = useArticleStore()

    userStore.getUserInfo()
    articleStore.getLabelsAndCount()

    const user = computed(() => userStore.user)
    const labels = computed(() => articleStore.labelList)

    const tagType = reactive(['success', 'info', 'warning', 'danger'])


    let goArticles = () => {
        router.push("/articles")
    }
</script>


<style scoped>
    /* info */
    .info-card {
        margin: 30px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        background-repeat: repeat-x;
    }

    .info-card-avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
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

    .article-btn {
        display: block;
        margin: 10px auto;
    }
</style>