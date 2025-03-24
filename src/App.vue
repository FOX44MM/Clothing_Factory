<script setup>

</script>

<template>

  <el-container >
    <!--  侧边栏  -->
    <el-aside>
      <el-menu router>
        <el-menu-item index="/emp">员工管理</el-menu-item>
        <el-menu-item index="/style">款式管理</el-menu-item>
        <el-menu-item index="/wp">工序信息</el-menu-item>
        <el-menu-item index="/salary">薪资管理</el-menu-item>
        <el-menu-item index="/test">测试</el-menu-item>

      </el-menu>
    </el-aside>


    <el-main>
      <router-view></router-view>
    </el-main>


  </el-container>


  <!--  <h1>制衣厂</h1>-->
  <!--  <router-link to="/emp">员工管理</router-link>-->
  <!--  <router-link to="/salary">薪资管理</router-link>-->
  <!--  <router-link to="/style">款式管理</router-link>-->
  <!--  <router-link to="/test">测试</router-link>-->


<!--  <hr>-->
<!--  <router-view></router-view>-->

</template>

<style scoped>
a {
  padding: 4px;
}
</style>
