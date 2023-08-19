<template>
  <el-container>
    <el-header >
      <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="true" @select="handleSelect" active-text-color="gray"
        background-color="#f9f9f9" text-color="black">
        <el-menu-item index="1">
          <template #title>
            <h2>Xinrui's Blog</h2>
          </template>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="index">
          <template #title>
            <h4>INDEX</h4>
          </template>
        </el-menu-item>
        <el-menu-item index="articles">
          <template #title>
            <h4>ARTICLES</h4>
          </template>
        </el-menu-item>
        <el-menu-item index="papers">
          <template #title>
            <h4>READING</h4>
          </template>
        </el-menu-item>
        <el-menu-item index="about">
          <template #title>
            <h4>ABOUT</h4>
          </template>
        </el-menu-item>
        <el-menu-item index="message">
          <template #title>
            <h4>MESSAGE</h4>
          </template>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <p>&copy2023 Xinrui. All rights reserved. </p>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
  import router from '@/router'


  let handleSelect = (key) => {
    console.log("handleClick called with key:", key);
    if (key === '1') {
      router.push('/index');
    } else {
      console.log("handleClick success! Navigating to:", `/${key}`);
      router.push(`/${key}`);
    }
  };


</script>

<style scoped>
  h1,h2,h3,h4,h5,h6 {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
  }

  .el-container {
    margin: 0;
    min-height: 100vh;
    background-color: #ffffff;
  }

  .el-header {
    padding: 0 0;
  }

  .el-main {
    padding: 0;
  }

  .el-menu {
    position: fixed;
    width: 100%;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .el-menu--horizontal>.el-menu-item {
    border-bottom: none;
    text-decoration: none;
  }


  .flex-grow {
    flex-grow: 1;
  }

  .el-footer {
    margin: 50px;
    text-align: center;
  }
</style>