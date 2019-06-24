<template>
  <div id="app">
    <!-- 使用keep-alive优化，把router中第一次显示的内容放到内存中，下次使用直接内存使用 -->
    <keep-alive> 
      <router-view />
    </keep-alive>
  </div>
</template>
<style lang="stylus"></style>
