<template>
  <el-container>
    <!--  侧边栏  -->
    <el-aside>
      <el-menu>
        <el-menu-item index="/emp">员工管理</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>

  </el-container>

</template>

<script setup>

</script>

<style scoped>

</style>
