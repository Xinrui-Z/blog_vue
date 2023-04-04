<template>
    <el-row class="tac">
        <el-col :span="3">
            <h5 class="mb-2">Xinrui's Blog</h5>
            <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="1">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>个人中心</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>博客管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="18" :offset="1">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { Document, Location, Setting} from '@element-plus/icons-vue'
    import router from '@/router'

    let handleSelect = (index) => {
        if(index == '1') {
            router.push('/backstage/index')
        } else {
            router.push('/backstage/index/manage')
        }
    }
</script>