<template>
    <el-row>
        <el-col :span="24">
            <div class="page-card">
                <p class="page-card-title">{{pageTitle}}</p>
                <p class="page-card-description">{{pageDescription}}</p>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
    defineProps({
        pageTitle: String,
        pageDescription :String
    })
</script>

<style scoped>
    .page-card {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        height: 500px;
        background-image: url('@/assets/images/indexbackground.jpg');
        background-repeat: repeat-x;
    }

    .page-card-title {
        font: 2em x-large;
    }

    .page-card-description {
        font: large bolder;
        font-family: serif;
    }
</style>