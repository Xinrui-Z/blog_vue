<template>
  <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="true" @select="handleSelect" active-text-color="white"
        background-color="#6f7c65" text-color="#d7d8ac">
        <el-menu-item index="1">Xinrui's Blog</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="index">主页</el-menu-item>
        <el-menu-item index="articles">博客</el-menu-item>
        <el-menu-item index="about">关于我</el-menu-item>
        <el-menu-item index="message">留言</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <p class="page-footer">Xinrui's Blog</p>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
  import router from '@/router'


  let handleSelect = (key) => {
    if (key == '1') {
      router.push('/index')
    } else {
      router.push(`/${key}`)
    }
  }

</script>

<style scoped>
  .el-container {
    min-height: 100vh;
  }
  .el-header {
    padding: 0 0;
  }

  .el-main {
    background: -moz-linear-gradient(top, #FFFEF8 0%, #FCFDFF 100%);
    background: -webkit-linear-gradient(top, #FFFEF8 0%, #FCFDFF 100%);
    background: linear-gradient(to bottom, #FFFEF8 0%, #FCFDFF 100%);
    padding: 0;
  }

  .el-menu--horizontal>.el-menu-item {
    border-bottom: none;
    text-decoration: none;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .page-footer {
    margin: 20px;
    text-align: center;
  }
</style>