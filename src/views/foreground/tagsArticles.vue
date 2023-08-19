<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="20" :md="20" :lg="12">
      <div class="articles">
        <ArticleCardListTag /> <!-- Use .value here -->
      </div>
    </el-col>
  </el-row>
  <el-pagination
      layout="prev, pager, next"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="articleStore.articleListTotal" @current-change="handleCurrentChange"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ArticleCardListTag from "@/views/foreground/components/ArticleCardListTag.vue"
import { useArticleStore } from '@/store/useArticleStore'
import { useRouter } from 'vue-router'

const page = ref(1)
const pageSize = ref(6)
const articleStore = useArticleStore()
const router = useRouter()
const isLoaded = ref(false)

const handleCurrentChange = (newPage) => {
  page.value = newPage;
}

onMounted(async () => {
  try {
    const label = router.currentRoute.value.params.label;
    console.log("tagsArticles mounted with label:", label);

    // Call the getArticleByLabel function
    await articleStore.getArticleByLabel(label);

    // Print the fetched data
    console.log("Fetched article data:", articleStore.articleList.value);

    isLoaded.value = true;
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<style scoped>
.page-description {
  text-align: center;
  font: 36px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;
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
