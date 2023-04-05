<template>
    <h2>发布文章</h2>
    <BlogEditPanel />
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

    const store = useArticleStore()

    const router = useRouter()

    if (router.currentRoute.value.query.id != undefined) {
        store.getArticle(router.currentRoute.value.query.id)
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
        article.articleImg = articleObj.articleAbstract
        article.articleAbstract = articleObj.articleAbstract
        article.articleContent = articleObj.articleContent
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
        store.addArticle(toRaw(article))
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