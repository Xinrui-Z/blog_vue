<template>
    <el-row>
        <el-col :span="24">
            <div class="info">
                <p class="info-author">Xinrui Zhou</p>
                <p class="info-sign">Think twice, code once.</p>
            </div>
        </el-col>
    </el-row>
    <div class="articles">
        <p class="articles-title">Recent Articles</p>
        <el-row justify="space-evenly" :gutter="80">
            <el-col :lg="6" :offset="1" :md="16" v-for="item in 6" :key="item">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
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
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }
</script>

<style>
    .info {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        height: 600px;
        background-image: url('../assets/images/indexbackground.jpg');
        background-repeat:repeat-x;
    }
    
    .info-author {
        font: italic 2em Georgia, serif;
    }

    .info-sign {
        font: large bolder;
        font-family: serif;
    }

    .info-description {
        text-align: center;
    }

    .articles {
        margin: 80px;
    }

    .articles img{
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