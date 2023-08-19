<template>
  <div class="background-div">
  </div>
  <el-row justify="space-evenly">
    <el-col :xs="22" :sm="20" :md="20" :lg="3">
      <div class="about">
        <h3 class="item-title">{{user.nickName}}</h3>
        <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="about-avatar" />
        <p class="about-sign">{{user.sign}}</p>
      </div>
      <div class="connect">
        <h3 class="item-title">CONNECT</h3>
        <el-link :icon="StarFilled" class="connect-link" :href="user.github">Github: {{user.github}}</el-link>
        <el-link :icon="Message" class="connect-link" :href="'mailto:'+user.email">Email:
          {{user.email}}</el-link>
      </div>
    </el-col>

    <el-col :xs="22" :md="12" :lg="12" v-for="article in articles" :key="article.id">
      <div>
        <p style="text-align: center; margin: 20px;">
          <el-icon style="margin-right: 5px">
            <Clock />
          </el-icon>更新于：{{article.updateTime}}
        </p>
        <v-md-editor :model-value="article.content" mode="preview" style="background-color: #f9f9f9;"></v-md-editor>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useArticleStore } from '@/store/useArticleStore'
import { StarFilled, Message } from '@element-plus/icons-vue'
import { Clock } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/useUserInfoStore'
import router from '@/router'

const articleStore = useArticleStore()
const userStore = useUserInfoStore()

const user = computed(() => userStore.user)
const articles = computed(() => articleStore.articles)
const label = ref('myself')


userStore.getUserInfo()
articleStore.getUser(label.value)


const goArticleDetail = (aid: String) => {
  router.push({
    path: '/articles/detail',
    query: {
      id: aid
    }
  })
}

</script>

<style scoped>
/* Phone */
@media screen and (max-width: 993px) {
  .background-div {
    height: 300px;
  }
}

/* PC */
@media screen and (min-width: 992px) {
  .background-div {
    height: 460px;
  }
}

h1,h2,h3,h4,h5,h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
}

.background-div {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background-image: url("../../assets/images/about.jpg");
}

.el-row {
  margin: 60px 0;
}


.about-avatar {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
}

.about-sign {
  margin-left: 10px;
  font: large bolder;
  color: gray;
}

.item-title {
  margin-top: 30px;
  margin-bottom: 20px;
}

/* connect */
.connect-link {
  margin: 10px;
}

</style>