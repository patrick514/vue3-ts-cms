<template>
  <div class="menu">
    <pageContent :content-config="contentConfig"></pageContent>
  
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue';
import contentConfig from './config/content.config';


</script>

<style scoped>
.menu {
}
</style>
