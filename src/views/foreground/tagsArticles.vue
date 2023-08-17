<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="20" :md="20" :lg="12">
      <div class="articles">
        <ArticleCardList :articles="articles" />
      </div>
    </el-col>
  </el-row>
  <el-pagination layout="prev, pager, next" v-model:current-page="page" v-model:page-size="pageSize"
                 :total="articleList.total" @current-change="handleCurrentChange" />
</template>


<script lang="ts" setup>
  import { ref, computed, onMounted} from 'vue'
  import {useRoute} from 'vue-router'
  import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
  import { useArticleStore } from '@/store/useArticleStore'

  const page = ref(1)
  const pageSize = ref(6)
  const store = useArticleStore()
  const articleList = computed(() => store.articleList)
  const articles = computed(() => store.articles) // Use the articles from the store

  console.log('tagsArticles mounted');
  // Call getArticleByLabel when the component is mounted
  onMounted(() => {
    const route = useRoute() // Correct usage of useRoute from 'vue-router'
    const label = route.params.label // Get the label parameter from the route
    console.log('label:', label)
    store.getArticleByLabel(label)
  })

  const handleCurrentChange = () => {
    store.getArticles(page.value, pageSize.value)
  }

</script>


<style scoped>
.page-description {
  text-align: center;
  font: 36px/1 Tahoma, Helvetica, Arial, ”\5b8b\4f53”, sans-serif;
}

.el-row {
  margin-top: 50px;
}

/* articles */
.articles {
  margin: 20px;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>