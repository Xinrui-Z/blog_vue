<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="20" :md="20" :lg="12">
      <div class="papers">
        <PaperCardListTag /> <!-- Use .value here -->
      </div>
    </el-col>
  </el-row>
  <el-pagination
      layout="prev, pager, next"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="paperStore.paperListTotal" @current-change="handleCurrentChange"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PaperCardListTag from "@/views/foreground/components/PaperCardListTag.vue"
import { usePaperStore } from '@/store/usePaperStore'
import { useRouter } from 'vue-router'

const page = ref(1)
const pageSize = ref(6)
const paperStore = usePaperStore()
const router = useRouter()
const isLoaded = ref(false)

const handleCurrentChange = (newPage) => {
  page.value = newPage;
}

onMounted(async () => {
  try {
    const label = router.currentRoute.value.params.label;
    console.log("tagsPapers mounted with label:", label);

    // Call the getPaperByLabel function
    await paperStore.getPaperByLabel(label);

    // Print the fetched data
    console.log("Fetched paper data:", paperStore.paperList.value);

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

/* papers */
.papers {
  margin: 20px;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
