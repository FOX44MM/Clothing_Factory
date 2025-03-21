<script setup>

</script>

<template>
<!--  <div class="app">-->
<!--    <el-container>-->
<!--      <el-header><h1>制衣厂</h1></el-header>-->
<!--      <el-container>-->
<!--        <el-aside width="200px">-->
<!--          <router-link to="/emp">员工管理</router-link>-->
<!--          <router-link to="/salary">薪资管理</router-link>-->
<!--          <router-link to="/style">款式管理</router-link>-->
<!--        </el-aside>-->
<!--        <el-main>内容</el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
<!--  </div>-->

  <h1>制衣厂</h1>
  <router-link to="/emp">员工管理</router-link>
  <router-link to="/salary">薪资管理</router-link>
  <router-link to="/style">款式管理</router-link>
  <router-link to="/test">测试</router-link>


  <hr>
  <router-view></router-view>

</template>

<style scoped>
a {
  padding: 4px;
}
</style>
