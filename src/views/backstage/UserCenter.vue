<template>
    <h2>个人中心</h2>
    <el-button color="#5d7430" plain @click="saveBasicInfo">Save</el-button>
    <ImageUpload :imageUrl="admin.avatarUrl" @Upload="getUploadData" />
    <div class="info-card">
        <el-form :model="admin" size="large">
            <el-form-item label="Nick：">
                <el-input v-model="admin.nickName" clearable />
            </el-form-item>
            <el-form-item label="Sign：">
                <el-input v-model="admin.sign" clearable />
            </el-form-item>
            <el-form-item label="Emial：">
                <el-input v-model="admin.email" clearable />
            </el-form-item>
            <el-form-item label="Github：">
                <el-input v-model="admin.github" clearable />
            </el-form-item>
        </el-form>
    </div>

    <el-button color="#5d7430" plain @click="handleReset">Reset Password</el-button>
    <el-button color="#5d7430" plain @click="savePwd">Save</el-button>
    <div class="info-card">
        <el-form :model="user" size="large">
            <el-form-item label="Password：">
                <el-input v-model="password" show-password clearable :disabled="isDisabled" />
            </el-form-item>
            <el-form-item label="Re-Enter：">
                <el-input v-model="rePassword" show-password clearable :disabled="isDisabled" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { useUserInfoStore } from '@/store/useUserInfoStore'
    import { ref, computed, watch, toRaw } from 'vue'
    import { User } from '@/types/type'
    import { ElMessage } from "element-plus"
    import ImageUpload from '@/views/backstage/components/ImageUpload.vue'

    let store = useUserInfoStore()
    store.getAdminInfo()

    let admin = ref < User > ({})

    let password = ref < string > ("")
    let rePassword = ref < string > ("")

    watch(() => store.admin, () => {
        admin.value = store.admin
    })


    let isDisabled = ref(true)

    let getUploadData = (uploadImgUrl: string) => {
        if(uploadImgUrl != '') {
            toRaw(admin.value).avatarUrl = uploadImgUrl
        } 
    }

    let handleReset = () => {
        isDisabled.value = false
    }

    let saveBasicInfo = () => {
        store.postBasicInfo(toRaw(admin.value))
    }

    let savePwd = () => {
        if (password.value == rePassword.value) {
            store.putPwd(password.value)
        } else {
            ElMessage.error("两次密码不一致，请重新输入！")
        }
        password.value = ''
        rePassword.value = ''
    }

</script>


<style scoped>
    .el-button {
        margin: 20px 0;
        margin-right: 30px;
        border-radius: 10px;
    }

    .info-card {
        margin: 20px auto;
    }

    .el-input {
        width: 400px;
    }
</style>