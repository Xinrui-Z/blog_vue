<template>
    <div class="editor-div">
        <v-md-editor height="400px" @save="handleSave" :model-value="article.content" />
        <el-form label-width="100px" style="max-width: 460px" label-position="left">
            <el-form-item label="标签">
                <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{ tag }}
                </el-tag>
                <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
                    @blur="handleInputConfirm" />
                <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                    + New Tag
                </el-button>
            </el-form-item>
            <el-form-item label="标题">
                <el-input type="textarea" v-model="article.title" />
            </el-form-item>
            <el-form-item label="封面">
                <el-upload list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" @change="onUploadChange">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="摘要">
                <el-input type="textarea" v-model="article.digest" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
    import BlogEditPanel from '@/views/backstage/component/BlogEditPanel.vue'
    import { ref, reactive, toRaw, watch, nextTick } from 'vue'
    import { Article } from '@/types/type'
    import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
    import type { UploadFile, UploadUserFile, UploadProps } from 'element-plus'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import { useRouter } from 'vue-router'
    import { ElInput } from 'element-plus'

    const inputValue = ref('')
    const dynamicTags = ref([])
    const inputVisible = ref(false)
    const InputRef = ref < InstanceType < typeof ElInput >> ()
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const articleId = ref()

    const store = useArticleStore()

    const router = useRouter()

    let createArticle = () => ({
        label: '',
        title: '',
        imgUrl: '',
        digest: '',
        content: ''
    })

    let article = reactive < Article > (createArticle())

    // update blog
    if (router.currentRoute.value.query.id != undefined) {
        store.getArticle(router.currentRoute.value.query.id)
        articleId.value = router.currentRoute.value.query.id
    }

    watch(() => store.article, () => {
        let articleObj = toRaw(store.article)
        article.label = articleObj.label
        article.title = articleObj.title
        article.imgUrl = articleObj.imgUrl
        article.digest = articleObj.digest
        article.content = articleObj.content
        article.id = articleId.value
    })

    // label
    const handleClose = (tag: string) => {
        dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    }

    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value!.input!.focus()
        })
    }

    const handleInputConfirm = () => {
        if (inputValue.value) {
            dynamicTags.value.push(inputValue.value)
        }
        inputVisible.value = false
        inputValue.value = ''
    }

    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        article.articleImg = ''
    }

    const handlePictureCardPreview = (file: UploadFile) => {
        console.log("文件",file)
        dialogImageUrl.value = file.url
        dialogVisible.value = true
    }

    const onUploadChange = (file) => {
        console.log("文件变化",file)
        article.articleImg = file.url
    }

    // save
    const handleSave = (text, html) => {
        article.content = html
        article.label = JSON.stringify(dynamicTags.value)
        if (router.currentRoute.value.query.id != undefined) {
            store.putArticle(toRaw(article))
            Object.assign(article, createArticle())
        } else {
            article.labelCount = 1
            store.addArticle(toRaw(article))
        }
    }

</script>

<style scoped>
    .editor-div {
        margin: 20px 0;
    }

    .el-form {
        margin-top: 30px;
    }
</style>