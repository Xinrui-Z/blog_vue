<template>
    <!-- <Weather /> -->
    <div class="background-div">
        <h1 style="font-size:60px">{{user.nickName}}'s Blog</h1>
    </div>
    <!-- <el-row>
        <el-col :span="24">
            <div class="info-card">
                <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="info-card-avatar" />
                <p class="info-card-nickname">{{user.nickName}}</p>
                <p class="info-card-sign">{{user.sign}}</p>
            </div>
        </el-col>
    </el-row> -->
    <el-row justify="center" :gutter="50">
        <!-- <el-col > -->
        <el-col :xs="22" :sm="20" :md="18" :lg="10">
            <!-- <div class="connect">
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
            </div> -->
            <div class="articles">
                <p class="item-title">Recent Articles</p>
                <ArticleCardList />
                <el-button round color="#b6bfaa" class="article-btn" @click="goArticles">
                    Know More
                </el-button>
            </div>

        </el-col>
        <el-col :xs="22" :sm="20" :md="20" :lg="4">
            <div class="about">
                <p class="item-title">ABOUT</p>
                <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="about-avatar" />
                <p class="about-sign">{{user.sign}}</p>
            </div>
            <div class="connect">
                <p class="item-title">CONNECT</p>
                <el-link :icon="StarFilled" class="connect-link" :href="user.github">Github: {{user.github}}</el-link>
                <el-link :icon="Message" class="connect-link" :href="'mailto:'+user.email">Email:
                    {{user.email}}</el-link>
            </div>
            <div class="tags">
                <p class="item-title">TAGS</p>
                <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labels" :key="index"
                    :type="tagType[index%4]">
                    <el-button>{{item.label}}</el-button>
                </el-badge>
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
        margin-bottom: 40px;
        /* border-radius: 10px; */
        background: url("https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
    }

    /* info */
    /* .info-card {
        margin: 20px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        background-repeat: repeat-x;
    } */
    .about {
        margin-top: 90px;
    }

    .about-avatar {
        width: 100%;
        height: 80%;
        border-radius: 8px;
        object-fit: cover;
    }

    .about-nickname {
        font: 2em x-large;
    }

    .about-sign {
        margin-left: 10px;
        font: large bolder;
        font-family: serif;
    }

    .item-title {
        margin-bottom: 20px;
        font: large bolder Helvetica;
    }

    /* connect */
    .connect-link {
        margin: 10px ;
    }

    /* tags */
    .tags {
        margin-top: 30px;
    }

    .tags-item {
        margin: 10px;
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