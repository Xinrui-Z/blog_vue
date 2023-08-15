<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="20" :md="20" :lg="12">
      <div class="papers">
        <PaperCardList :papers="papers" />
      </div>
    </el-col>
  </el-row>
  <el-pagination layout="prev, pager, next" v-model:current-page="page" v-model:page-size="pageSize"
                 :total="paperList.total" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PaperCardList from '@/views/foreground/components/PaperCardList.vue';
import { usePaperStore } from '@/store/usePaperStore';

const route = useRoute();
const selectedLabel = route.params.label;

const page = ref(1);
const pageSize = ref(6);

const { getPaperByLabel, paperList } = usePaperStore();
const papers = ref([]);

const handleCurrentChange = () => {
  getPaperByLabel(selectedLabel, page.value, pageSize.value)
      .then((response) => {
        papers.value = response.data.data.papers;
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

/* papers */
.papers {
  margin: 20px;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>