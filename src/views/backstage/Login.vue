<template>
    <div class="login-div">
        <el-row  class="row-bg" justify="center">
          <el-col :xs="23" :sm="23" :md="18" :lg="8" :xl="8">
            <h2>WELCOME</h2>
            <el-form size="large">
                <el-form-item label="username:">
                    <el-input v-model="user.number" clearable/>
                </el-form-item>
                <el-form-item label="password:">
                    <el-input v-model="user.password" show-password clearable/>
                </el-form-item>
            </el-form>
            <el-button @click="goLogin">login</el-button>
          </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
    import { Calendar, Search } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import { useUserInfoStore } from '@/store/useUserInfoStore'
    import { User } from '@/types/type'

    let store = useUserInfoStore()

    let user = ref<User>({})

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

    .el-row {
        text-align: center;
        top: 32%;
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