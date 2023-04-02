<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <!-- <el-menu-item index="index" style="font:1.5em bold Arial;">Xinrui's Blog</el-menu-item> -->
          <div class="flex-grow" />
          <el-menu-item index="index">Home</el-menu-item>
          <el-menu-item index="articles">Articles</el-menu-item>
          <el-menu-item index="about">About</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <p class="footer">Xinrui's Blog</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router'


  let handleSelect = (key) => {
    router.push(`/${key}`)
  }

</script>

<style scoped>
  .flex-grow {
    flex-grow: 1;
  }

  .footer {
    text-align: center;
  }
</style>