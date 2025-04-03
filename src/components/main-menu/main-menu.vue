<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@\assets\logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        :collapse="isFold"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id + ''">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
// import { firstMenu } from '@/utils/map-menus'

import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
defineProps({
  isFold: {
    type: Boolean,
    defalut: false,
  },
})
const loginStore = userLoginStore()
const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

const route = useRoute()
// 当前路径匹配菜单的index选择
const userMenus = loginStore.userMenus

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
