<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold? '60px' : '210px'">
        <MainMenu :is-fold="isFold"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handleFoldChange"></MainHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!-- <div class="main">
    <button @click="handleExitClick">退出登录</button>
  </div> -->
</template>

<script setup lang="ts">

import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
const handleFoldChange = (flag:boolean)=>{
  isFold.value = flag
}


// const handleExitClick = () => {
//   localCache.removeCache(LOGIN_TOKEN)

//   router.push('/login')
// }
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.5s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
