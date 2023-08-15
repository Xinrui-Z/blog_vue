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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue';
import { useArticleStore } from '@/store/useArticleStore';

const route = useRoute();
const selectedLabel = route.params.label;

const page = ref(1);
const pageSize = ref(6);

const { getArticleByLabel, articleList } = useArticleStore();
const articles = ref([]);

const handleCurrentChange = () => {
  getArticleByLabel(selectedLabel, page.value, pageSize.value)
      .then((response) => {
        articles.value = response.data.data.articles;
      })
      .catch((error) => {
        console.error(error);
      });
};

onMounted(() => {
  handleCurrentChange();
});
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
