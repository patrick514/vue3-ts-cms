<template>
  <div class="panel-phone">
    <el-form
         label-width="auto"

      style="max-width: 600px"
    >
      <el-form-item label="Name" >
        <el-input  />
      </el-form-item>
      <el-form-item label="Activity zone" >
        <el-input  />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

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
