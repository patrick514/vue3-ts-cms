<template>
  <div class="panel-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号" >
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
</script>

<style lang="less" scoped>
.panel-phone {
  color: red;
}

.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
