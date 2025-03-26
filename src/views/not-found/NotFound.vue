<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="router.push('/main')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="less" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;

  .content {
    text-align: center;

    h1 {
      font-size: 120px;
      color: #409eff;
      margin: 0;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 30px;
      color: #303133;
      margin: 20px 0;
    }

    p {
      color: #606266;
      font-size: 16px;
      margin-bottom: 30px;
    }

    .el-button {
      padding: 12px 30px;
      font-size: 16px;

      &:hover {
        transform: translateY(-2px);
        transition: transform 0.3s ease;
      }
    }
  }
}
</style>
