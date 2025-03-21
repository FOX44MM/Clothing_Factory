<template>
  <h2>员工管理</h2>
  <router-link to="/emp/tableEmployee">查看员工</router-link>
  <router-link to="/emp/addemployee">添加员工</router-link>

  <router-view></router-view>
</template>


<script setup>

</script>

<style scoped>
  a{
    padding: 4px;
  }
</style>