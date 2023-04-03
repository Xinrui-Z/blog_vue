<template>
    <PageCard page-title="Articles" page-description="hahhah"/>
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="articles">
            <el-row justify="space-evenly" :gutter="60">
                <el-col :lg="7"  :md="16" v-for="item in 6" :key="item">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="goDetail">
                        <img
                            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
                        <div style="padding: 14px">
                            <el-tag round>
                                Java
                            </el-tag>
                            <p>Yummy hamburger</p>
                            <el-button text class="button">Operating</el-button>
                            <el-divider />
                            <span>2023/4/2</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
      </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import router from '@/router'
    import { ref, reactive } from 'vue'
    import PageCard from '@/components/PageCard.vue'

    let goDetail = () => {
        router.push('/articles/detail')
    }
</script>

<style scoped>
    /* articles */
    .articles {
        margin: 36px;
    }
    .articles img {
        width: 100%;
        height: 260px;
    }

    .articles-title {
        margin-bottom: 20px;
        font: large bolder Helvetica;
    }

    .el-card {
        border-radius: 10px;
        margin: 26px auto;
    }
</style>