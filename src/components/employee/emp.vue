<script setup>

</script>

<template>
  <router-link to="/emp/tableEmployee">查看员工</router-link>
  <router-link to="/emp/addemployee">添加员工</router-link>

  <router-view></router-view>
</template>

<style scoped>
  a{
    padding: 4px;
  }
</style>