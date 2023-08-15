<template>
  <div class="editor-div">
    <v-md-editor height="400px" @save="handleSave" v-model="paper.content" autofocus="true"
                 @upload-image="handleUploadImage" :disabled-menus="[]" />
    <el-form label-width="100px" style="max-width: 460px" label-position="left">
      <el-form-item label="标签">
        <el-input v-model="paper.label" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input type="textarea" v-model="paper.title" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input type="textarea" v-model="paper.author" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="paper.digest" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import PaperEditPanel from '@/views/backstage/components/PaperEditPanel.vue'
import ImageUpload from '@/views/backstage/components/ImageUpload.vue'
import { ref, reactive, toRaw, watch } from 'vue'
import { Paper } from '@/types/type'
import { ElInput, ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile, UploadProps } from 'element-plus'
import { usePaperStore } from '@/store/usePaperStore.ts'
import { useRouter } from 'vue-router'
import { getBase64 } from '@/utils/util.ts'

const store = usePaperStore()
const router = useRouter()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const paperId = ref('')

const fileList = ref < UploadUserFile[] > ([

])

const filess = ref([])

let fileBase64 = ""

let paper = ref < Paper > ({
  label: '',
  labelCount: 1,
  title: '',
  author: '',
  content: ''
})

//if update 
if (router.currentRoute.value.query.id != undefined) {
  store.getPaperById(router.currentRoute.value.query.id)
  paperId.value = router.currentRoute.value.query.id
}

watch(() => store.paper, () => {
  let paperObj = toRaw(store.paper)
  paper.value = paperObj
})

// save
const handleSave = async (text, html) => {
  paper.content = html;
  try {
    if (router.currentRoute.value.query.id != undefined) {
      await store.putPaper(toRaw(paper.value));
    } else {
      await store.postPaper(toRaw(paper.value), toRaw(filess.value));
    }
    // 这里可能还需要进行一些操作，比如显示保存成功的消息等
  } catch (error) {
    console.error("An error occurred:", error);
    // 在这里处理错误，比如显示错误消息给用户
  }
};

</script>

<style scoped>
.editor-div {
  margin: 20px 0;
}

.el-form {
  margin-top: 30px;
}
</style>