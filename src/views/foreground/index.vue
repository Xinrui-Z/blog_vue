<template>
    <el-row>
        <el-col :span="24">
            <div class="info-card">
                <img src="@/assets/images/indexbackground.jpg" class="info-card-avatar"/>
                <p class="info-card-nickname">zhouxinrui</p>
                <p class="info-card-sign">hhhhhh</p>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="connect">
                <p class="item-title">Connect</p>
                <el-link :icon="StarFilled" type="primary" class="connect-link">Github: https://github.com/XinrZhou</el-link>
                <el-link :icon="Message" type="info" class="connect-link">Email: zhouxinrui02@gmail.com</el-link>
            </div>
            <div class="tags">
                <p class="item-title">Tags</p>
                <el-badge :value="12" class="tags-item" v-for="(item, index) in 6" :key="index"
                    :type="tagType[index%4]">
                    <el-button>Leetcode</el-button>
                </el-badge>
            </div>
            <div class="articles">
                <p class="item-title">Recent Articles</p>
                <el-row justify="space-evenly" :gutter="50">
                    <el-col :lg="7" :md="16" v-for="item in 6" :key="item">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
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
    import { ref, reactive } from 'vue'
    import { StarFilled, Message } from '@element-plus/icons-vue'
    import PageCard from '@/components/PageCard.vue'

    const tagType = reactive(['success', 'info', 'warning', 'danger'])
</script>

<style scoped>
    /* info */
    .info-card {
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        align-items: center;
        background-repeat: repeat-x;
    }
    .info-card-avatar {
        width: 280px;
        height: 280px;
        border-radius: 50%;
    }
    .info-card-nickname {
        font: 2em x-large;
    }
    .info-card-sign {
        font: large bolder;
        font-family: serif;
    }

    .item-title {
        margin-bottom: 20px;
        font: large bolder Helvetica;
    }

    /* connect */
    .connect-link {
        margin: 10px 30px;
    }

    /* tags */
    .tags {
        margin-top: 30px;
    }

    .tags-item {
        margin: 20px;
    }

    /* articles */
    .articles img {
        width: 100%;
        height: 260px;
    }

    .el-card {
        border-radius: 10px;
        margin: 26px auto;
    }
</style>