<script setup>

</script>

<template>

  <el-container>
    <!--  侧边栏  -->
    <!--    <el-aside width="200px" style="background-color:rgb(50.8, 116.6, 184.5);">-->
    <el-aside width="200px">

      <el-menu router>
        <el-scrollbar>
          <el-menu-item index="/emp">员工管理</el-menu-item>
          <el-menu-item index="/style">款式管理</el-menu-item>
          <el-menu-item index="/wp">工序信息</el-menu-item>
          <el-menu-item index="/salary">薪资管理</el-menu-item>
          <el-menu-item index="/test">测试</el-menu-item>
        </el-scrollbar>


      </el-menu>
    </el-aside>


    <el-main>
      <router-view></router-view>
    </el-main>


  </el-container>

</template>

<style scoped>
a {
  padding: 4px;
}
</style>
