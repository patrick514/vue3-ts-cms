<script setup lang="ts"></script>

<template>
  <header>
    <div class="wrapper">
      <h1>app</h1>
      <router-link to="/main">主要</router-link>
      <router-link to="/login">登录</router-link>

      <router-view></router-view>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped></style>
