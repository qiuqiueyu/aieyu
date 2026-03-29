<template>
  <!-- 只保留路由出口，用来渲染不同页面 -->
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式重置，避免页面滚动、边距问题 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>