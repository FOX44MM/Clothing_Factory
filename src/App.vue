<script setup>

</script>

<template>
  <h1>制衣厂</h1>
  <router-link to="/emp">员工管理</router-link>
  <router-link to="">款式管理</router-link>
  <router-link to="">薪资管理</router-link>

  <hr>
  <router-view></router-view>

</template>

<style scoped>
  a{
    padding: 4px;
  }
</style>
