<template>
    <div class="login-div">
        <div class="input-div">
            <h2>WELCOME</h2>
            <el-form :model="form" size="large">
                <el-form-item label="username:">
                    <el-input v-model="user.number" clearable/>
                </el-form-item>
                <el-form-item label="password:">
                    <el-input v-model="user.password" show-password clearable/>
                </el-form-item>
            </el-form>
            <el-button @click="goLogin">login</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { Calendar, Search } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import { useUserInfoStore } from '@/store/useUserInfoStore.ts'

    let store = useUserInfoStore()

    let user = ref<user>({})

    let goLogin = () => {
        store.login(user.value)
        user.value.number = ''
        user.value.password = ''
    }
</script>

<style scoped>
    .login-div {
        width: 100%;
        height: 100vh;
        background-color: #e5dfd5;
        background-size: 100% 100%;
    }

    .input-div {
        text-align: center;
        width: 28%;
        position: absolute;
        padding: 10px 16px;
        left: 36%;
        top: 33%;
    }

    .el-button {
        background-color: #efefef;
        width: 80px;
        border-radius: 10px;
    }

    .el-button:hover {
        background-color: #9aa7b1;
        color: beige;
    }
</style>