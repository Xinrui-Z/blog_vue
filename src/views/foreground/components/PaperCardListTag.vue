<template>
  <el-row>
    <el-col :span="24" v-for="paper in paperList" :key="paper.id">
      <el-card class="box-card" @click="goPaperDetail(paper.id)">
        <template #header>
          <div class="card-header">
            <h4 class="card-header-title">{{ paper.title }}</h4>
            <el-tag color="#f7f4ed">
              {{ paper.label }}
            </el-tag>
          </div>
        </template>
        <div class="paper-content">{{ paper.content }}</div>
        <el-divider />
        <span class="paper-time">{{ paper.updateTime }}</span>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePaperStore } from '@/store/usePaperStore'
import router from '@/router'
import { toRefs } from 'vue'

const paperStore = usePaperStore()
// paperStore.getPapers(1, 6)


console.log("paperStore.paperList:", paperStore.paperList);

// const paperList = computed(() => paperStore.paperList.papers || []) // 添加空值检查
// const { paperList } = toRefs(paperStore)
const paperList = computed(() => paperStore.paperList.value)
const goPaperDetail = (id: String) => {
  router.push({
    path: '/papers/detail',
    query: {
      id: id
    }
  })
}

</script>

<style scoped>
    /* papers */
    .papers {
        align-items: center;
    }

    .paper-img {
        width: 100%;
        height: 200px;
        background-size: cover;
    }

    .paper-title {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    .paper-content {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    }

    .paper-time {
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