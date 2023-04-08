<template>
    <el-upload list-type="picture-card" ref="elupload" class="avatar-uploader" v-model:file-list="fileList"
        :on-preview="handlePictureCardPreview" :http-request="httpRequest" :on-remove="handleRemove" action="#"
        :limit="1">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script setup lang='ts'>
    import { ref, watch, defineEmits, toRaw } from 'vue'
    import { Article } from '@/types/type'
    import { ElInput, ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadFile, UploadUserFile, UploadProps } from 'element-plus'
    import { getBase64 } from '@/utils/util.ts'

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const articleId = ref('')

    let uploadImgUrl = ref('')
    let fileBase64 = ref('')

    let props = defineProps({
        imageUrl: String
    })

    const fileList = ref < UploadUserFile[] > ([
    ])

    const emits = defineEmits(['Upload'])

    watch(() => props.imageUrl, () => {
        fileList.value.push({
            url: "data:image/jpeg;base64," + props.imageUrl
        })
    })

    watch(() => fileBase64.value, () => {
        emits('Upload', fileBase64.value)
    })

    // picture remove
    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        uploadImgUrl.value = ''
        fileBase64.value = ''
    }

    // picture preview
    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
    }

    let httpRequest = (data) => {
        uploadImgUrl.value = URL.createObjectURL(data.file);
        const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png';
        const isLt2M = data.file.size / 1024 / 1024 < 2;
        if (!isPFX) {
            ElMessage.error("上传头像图片只能是 JPG、PNG、JPEG 格式!");
        } else if (!isLt2M) {
            ElMessage.error("上传文件大小不能超过 2MB!");
        } else {
            getBase64(data.file).then(resBase64 => {
                fileBase64.value = resBase64.split(',')[1]
            })
        }
    }


</script>

<style scoped>

</style>