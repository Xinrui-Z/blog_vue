<template>
    <!-- <Weather /> -->
    <div class="background-div">
        <h1 style="font-size:60px;">Live for the moment</h1>
    </div>
    <el-row justify="space-evenly">
        <el-col :xs="22" :sm="20" :md="18" :lg="12">
            <div class="articles">
                <h2 class="item-title">Recent Articles</h2>
                <ArticleCardList />
                <el-icon class="article-more" @click="goArticles">
                    <More />
                </el-icon>
            </div>

            <div class="papers">
              <h2 class="item-title">Recent Papers</h2>
              <PaperCardList/>
              <el-icon class="paper-more" @click="goPapers">
                <More />
              </el-icon>
            </div>

        </el-col>
        <el-col :xs="22" :sm="20" :md="20" :lg="3">
            <div class="about hidden-xs-only">
                <h5 class="item-title">ABOUT</h5>
                <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="about-avatar" />
                <p class="about-sign">{{user.sign}}</p>
            </div>
            <div class="connect">
                <h5 class="item-title">CONNECT</h5>
                <el-link :icon="StarFilled" class="connect-link" :href="user.github">Github: {{user.github}}</el-link>
                <el-link :icon="Message" class="connect-link" :href="'mailto:'+user.email">Email:
                    {{user.email}}</el-link>
            </div>
            <div class="tags">
                <h5 class="item-title">TAGS_BLOGS</h5>
                <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labels" :key="index"
                    :type="tagType[index%4]">
                  <el-button @click="goToArticlesByLabel(item.label)">{{ item.label }}</el-button>
                </el-badge>
            </div>
            <div class="tags">
              <h5 class="item-title">TAGS_PAPERS</h5>
              <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labelsp" :key="index"
                        :type="tagType[index%4]">
                <el-button @click="goToPapersByLabel(item.label)">{{ item.label }}</el-button>
              </el-badge>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
    import Weather from '@/components/Weather.vue'
    import { ref, reactive, computed } from 'vue'
    import { StarFilled, Message, More } from '@element-plus/icons-vue'
    import { useUserInfoStore } from '@/store/useUserInfoStore'
    import { useArticleStore } from '@/store/useArticleStore'
    import { User } from '@/types/type'
    import router from '@/router'
    import PaperCardList from "@/views/foreground/components/PaperCardList.vue";
    import {usePaperStore} from "@/store/usePaperStore";

    let userStore = useUserInfoStore()
    let articleStore = useArticleStore()
    let paperStore =usePaperStore()

    userStore.getUserInfo()
    articleStore.getLabelsAndCount()
    paperStore.getLabelsAndCount()

    const user = computed(() => userStore.user)
    const labels = computed(() => articleStore.labelList)
    const labelsp = computed(() => paperStore.labelList)

    const tagType = reactive(['success', 'info', 'warning', 'danger'])

    let goArticles = () => {
        router.push("/articles")
    }

    let goPapers = () => {
      router.push("/papers")
    }

    // 根据标签获取文献信息
    const goToPapersByLabel = (label) => {
      router.push({ name: 'tagsPaper', params: { label } });
    };

    // 根据标签获取文献信息
    const goToArticlesByLabel = (label) => {
      router.push({ name: 'tagsArticle', params: { label } });
    };

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

    h1,h2,h3,h4,h5,h6 {
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
    }

    .background-div {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        color: white;
        opacity: 0.9;
        margin-bottom: 40px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        background-image: url(.././../assets/images/index.jpg);
        //position: absolute;
    }

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
    }

    .item-title {
        margin-top: 30px;
        margin-bottom: 20px;
    }

    /* connect */
    .connect-link {
        margin: 3px;
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

    .article-more {
        display: block;
        margin: 10px auto;
    }

    /* papers */
    .papers {
      align-items: center;
    }

    .paper-more {
      display: block;
      margin: 10px auto;
    }
</style>