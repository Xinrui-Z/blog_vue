<template>
  <el-row>
    <el-col :span="24" class="animate__animated animate__backInDown">
      <p class="paper-title">{{paper.title}}</p>
      <p style="text-align: center;">
        <el-icon style="margin-right: 5px">
          <Clock />
        </el-icon>更新于：{{paper.updateTime}}
      </p>
      <p class="paper-author">作者：{{paper.author}}</p>
      <v-md-editor :model-value="paper.content" mode="preview"></v-md-editor>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router'
  import { ref, computed } from 'vue'
  import { usePaperStore } from '@/store/usePaperStore'
  import { Clock } from '@element-plus/icons-vue'

  const paperStore = usePaperStore()
  const router = useRouter()
  let aid = ref('')

  aid.value = router.currentRoute.value.query.id
  paperStore.getPaperById(aid.value)
  const paper = computed(() => paperStore.paper)

</script>

<style scoped>
  /* Phone */
  @media screen and (max-width: 993px) {
    .el-row {
      max-width: 100%;
    }
    img {
            height: 300px;
        }
  }

  /* PC */
  @media screen and (min-width: 992px) {
    .el-row {
      left: 15%;
      max-width: 70%;
    }

    img {
            height: 460px;
        }
  }

  .background-image {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  .el-row {
    margin-top: 30px;
  }

  p {
    font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  }

  .paper-title {
    text-align: center;
    font: 36px/1 Tahoma, Helvetica, Arial, ”\5b8b\4f53”, sans-serif;
  }

  .paper-author {
    text-align: center;
    font: 16px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  }
</style>