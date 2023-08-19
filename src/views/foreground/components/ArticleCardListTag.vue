<template>
  <el-row>
    <el-col :span="24" v-for="article in articleList" :key="article.id">
      <el-card class="box-card" @click="goArticleDetail(article.id)">
        <template #header>
          <div class="card-header">
            <h4 class="card-header-title">{{ article.title }}</h4>
            <el-tag color="#f7f4ed">
              {{ article.label }}
            </el-tag>
          </div>
        </template>
        <div class="article-content">{{ article.content }}</div>
        <el-divider />
        <span class="article-time">{{ article.updateTime }}</span>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useArticleStore } from '@/store/useArticleStore'
import router from '@/router'
import { toRefs } from 'vue'

const articleStore = useArticleStore()
// articleStore.getArticles(1, 6)


console.log("articleStore.articleList:", articleStore.articleList);

// const articleList = computed(() => articleStore.articleList.articles || []) // 添加空值检查
// const { articleList } = toRefs(articleStore)
const articleList = computed(() => articleStore.articleList.value)
const goArticleDetail = (id: String) => {
  router.push({
    path: '/articles/detail',
    query: {
      id: id
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
        height: 200px;
        background-size: cover;
    }

    .article-title {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    .article-content {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    }

    .article-time {
        font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    }

    .card-header-title {
        display: inline-block;
        margin-right: 10px;
    }

    .el-tag {
        color: #584717;
    }

    .el-card {
        width: 100%;
        border-radius: 10px;
        margin: 26px auto;
    }
</style>