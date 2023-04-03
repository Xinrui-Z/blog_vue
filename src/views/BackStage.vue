<template>
    <div class="input-div">
        <el-form :model="form">
            <el-form-item label="username:">
                <el-input v-model="user.username" />
            </el-form-item>
            <el-form-item label="password:">
                <el-input v-model="user.password" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
    import { Calendar, Search } from '@element-plus/icons-vue'
    import { ref } from 'vue'

    let user = ref({
        username: '',
        password: ''
    })
</script>

<style scoped>
    .input-div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>