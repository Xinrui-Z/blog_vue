<template>
  <!-- <Weather /> -->
  <div class="background-div">
  </div>
  <el-row justify="space-evenly">
    <el-col :xs="22" :sm="20" :md="18" :lg="12">
      <div class="articles">
        <h2 class="item-title">Articles</h2>
        <ArticleCardList />
        <el-icon class="article-more" @click="goArticles">
          <More />
        </el-icon>
      </div>

      <div class="papers">
        <h2 class="item-title">Reading</h2>
        <PaperCardList/>
        <el-icon class="paper-more" @click="goPapers">
          <More />
        </el-icon>
      </div>

    </el-col>
    <el-col :xs="22" :sm="20" :md="20" :lg="3">
      <div class="about hidden-xs-only">
        <h5 class="item-title">ABOUT</h5>
        <img :src="'data:image/jpeg;base64,'+user.avatarUrl" class="about-avatar" />
        <p class="about-sign">{{user.sign}}</p>
      </div>
      <div class="connect">
        <h5 class="item-title">CONNECT</h5>
        <el-link :icon="StarFilled" class="connect-link" :href="user.github">Github: {{user.github}}</el-link>
        <el-link :icon="Message" class="connect-link" :href="'mailto:'+user.email">Email:
          {{user.email}}</el-link>
      </div>
      <div class="tags">
        <h5 class="item-title">TAGS_BLOGS</h5>
        <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labels" :key="index"
                  :type="tagType[index % 4]">
          <!-- 注意这里的@click事件绑定 -->
          <!--                <el-button @click="goTagsArticle(item.label)">{{ item.label }}</el-button>-->
          <el-button @click="handleTagArticleClick (item.label)">{{ item.label }}</el-button>
        </el-badge>
      </div>
      <div class="tags">
        <h5 class="item-title">TAGS_PAPERS</h5>
        <el-badge :value="item.labelCount" class="tags-item" v-for="(item, index) in labelsp" :key="index"
                  :type="tagType[index % 4]">
          <!-- 注意这里的@click事件绑定 -->
          <el-button @click="handleTagPaperClick(item.label)">{{ item.label }}</el-button>
        </el-badge>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { StarFilled, Message, More } from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/store/useUserInfoStore'
import { useArticleStore } from '@/store/useArticleStore'
import { usePaperStore } from "@/store/usePaperStore";
import router from '@/router'
import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
import PaperCardList from "@/views/foreground/components/PaperCardList.vue";
import axios from 'axios'


let userStore = useUserInfoStore()
let articleStore = useArticleStore()
let paperStore =usePaperStore()

userStore.getUserInfo()
articleStore.getLabelsAndCount()
paperStore.getLabelsAndCount()

const user = computed(() => userStore.user)
const labels = computed(() => articleStore.labelList)
const labelsp = computed(() => paperStore.labelList)

const tagType = reactive(['success', 'info', 'warning', 'danger'])

let goArticles = () => {
  router.push("/articles")
}

let goPapers = () => {
  router.push("/papers")
}


// 点击标签事件处理程序
const handleTagArticleClick = (label) => {
  // 在这里设置正确的 token 到 localStorage
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4Mzc5MzM5NTQwMDcwMDcyMzIwIiwiZXhwIjoxNjkyMzc3NDQwfQ.fFupRP95FZtWd637xEYXQb9w8TfLkyFHwrRgevyFNYw');

  // 调用获取文章函数
  goTagsArticle(label);
};

const handleTagPaperClick = (labelp) => {
  // 在这里设置正确的 token 到 localStorage
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4Mzc5MzM5NTQwMDcwMDcyMzIwIiwiZXhwIjoxNjkyMzc3NDQwfQ.fFupRP95FZtWd637xEYXQb9w8TfLkyFHwrRgevyFNYw');

  // 调用获取文章函数
  goTagsPaper(labelp);
};

let goTagsArticle = async (label) => {
  const token = localStorage.getItem("token");
  console.log('Label clicked:', label);

  console.log('goTagsArticle called with label:', label);

  try {
    const response = await axios.get(`/front/tagsArticle/${label}`, {
      headers: {
        'token': token
      }
    });

    console.log('Response:', response);
    console.log('response.data', response.data);

    const articles = response.data.articles;

    // 在这里处理后端返回的数据，可以将数据存储到响应式数据中
    articleStore.articleList.articles = articles; // 将特定标签的文章存入 articleStore.articleList.articles

    // 在获取数据后进行页面跳转
    router.push({ name: 'tagsArticle', params: { label: label } });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};


let goTagsPaper = async (labelp) => {
  const token = localStorage.getItem("token");
  console.log('Label clicked:', labelp);

  console.log('goTagsPaper called with label:', labelp);

  try {
    const response = await axios.get(`/front/tagsPaper/${labelp}`, {
      headers: {
        'token': token
      }
    });

    console.log('Response:', response);
    console.log('response.data', response.data);

    const papers = response.data.papers;

    // 在这里处理后端返回的数据，可以将数据存储到响应式数据中
    paperStore.paperList.papers = papers; // 将特定标签的文章存入 articleStore.articleList.articles

    // 在获取数据后进行页面跳转
    router.push({ name: 'tagsPaper', params: { label: labelp } });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

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
  color: white;
  opacity: 0.9;
  margin-bottom: 40px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background-image: url(.././../assets/images/index.jpg);
//position: absolute;
}

.about {
  margin-top: 90px;
}

.about-avatar {
  width: 100%;
  height: 80%;
  border-radius: 8px;
  object-fit: cover;
}

.about-nickname {
  font: 2em x-large;
}

.about-sign {
  margin-left: 10px;
  font: large bolder;
}

.item-title {
  margin-top: 30px;
  margin-bottom: 20px;
}

/* connect */
.connect-link {
  margin: 3px;
}

/* tags */
.tags {
  margin-top: 30px;
}

.tags-item {
  margin: 10px;
}

/* articles */
.articles {
  align-items: center;
}

.article-more {
  display: block;
  margin: 10px auto;
}

/* papers */
.papers {
  align-items: center;
}

.paper-more {
  display: block;
  margin: 10px auto;
}
</style>