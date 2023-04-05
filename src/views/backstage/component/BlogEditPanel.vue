<template>
    <div class="editor-div">
        <v-md-editor v-model="text" height="400px" @save="handleSave" :model-value="article.articleContent" />
        <el-form label-width="100px" style="max-width: 460px" label-position="left">
            <el-form-item label="文章标签">
                <el-input v-model="article.articleLabel" />
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input type="textarea" v-model="article.articleTitle" />
            </el-form-item>
            <el-form-item label="添加封面">
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
            <el-form-item label="文章摘要">
                <el-input type="textarea" v-model="article.articleAbstract" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
    import { ref, reactive, toRaw, watch } from 'vue'
    import { Article } from '@/types/type'
    import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
    import type { UploadFile, UploadUserFile, UploadProps } from 'element-plus'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import BlogEditPanel from '@/views/backstage/component/BlogEditPanel.vue'
    import { useRouter } from 'vue-router';

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const articleId = ref()

    const store = useArticleStore()

    const router = useRouter()

    if (router.currentRoute.value.query.id != undefined) {
        store.getArticle(router.currentRoute.value.query.id)
        articleId.value = router.currentRoute.value.query.id
    }

    let article = reactive < Article > ({
        articleLabel: '',
        articleTitle: '',
        articleImg: '',
        articleAbstract: '',
        articleContent: ''
    })


    watch(() => store.article, () => {
        let articleObj = toRaw(store.article)
        article.articleLabel = articleObj.articleLabel
        article.articleTitle = articleObj.articleTitle
        article.articleImg = articleObj.articleImg
        article.articleAbstract = articleObj.articleAbstract
        article.articleContent = articleObj.articleContent
        article.id = articleId.value
    })

    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        article.articleImg = ''
    }

    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
    }

    const onUploadChange = (file) => {
        article.articleImg = file.url
    }

    const handleSave = (text, html) => {
        article.articleContent = html
        if(router.currentRoute.value.query.id != undefined) {
            store.putArticle(toRaw(article))
        } else {
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