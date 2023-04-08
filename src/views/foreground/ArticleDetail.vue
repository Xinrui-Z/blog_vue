<template>
  <img :src="'data:image/jpeg;base64,'+article.imgUrl" class="background-image" />
  <el-row>
    <el-col :span="14" :offset="5" class="animate__animated animate__backInDown">
      <p class="article-title">{{article.title}}</p>
      <p style="text-align: center;">
        <el-icon style="margin-right: 5px">
          <Clock />
        </el-icon>更新于：{{article.insertTime}}
      </p>
      <p class="article-digest">{{article.digest}}</p>
      <v-md-editor :model-value="article.content" mode="preview"></v-md-editor>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router'
  import { ref, computed } from 'vue'
  import { useArticleStore } from '@/store/useArticleStore.ts'
  import { Clock } from '@element-plus/icons-vue'

  const articleStore = useArticleStore()
  const router = useRouter()
  let aid = ref('')

  aid.value = router.currentRoute.value.query.id
  articleStore.getArticleById(aid.value)
  const article = computed(() => articleStore.article)

</script>

<style scoped>
  .background-image {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    object-fit: cover;
  }

  p {
    font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  }

  .article-title {
    text-align: center;
    font: 36px/1 Tahoma, Helvetica, Arial, ”\5b8b\4f53”, sans-serif;
  }

  .article-digest {
    text-align: center;
    font: 16px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  }
</style>