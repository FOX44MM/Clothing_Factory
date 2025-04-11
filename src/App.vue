<script setup>

</script>

<template>
  <div class="app">
    <el-container style="height: 100%" class="fixed-header">
      <!--  侧边栏  -->
      <!--    <el-aside width="200px" style="background-color:rgb(50.8, 116.6, 184.5);">-->
      <el-aside width="200px" class="fixed-aside">
        <el-scrollbar>
          <el-menu router>

            <el-menu-item index="/emp">员工管理</el-menu-item>
            <el-menu-item index="/style">款式管理</el-menu-item>
            <el-menu-item index="/wp">工序信息</el-menu-item>
            <el-menu-item index="/salary">薪资管理</el-menu-item>
            <el-menu-item index="/test">测试</el-menu-item>


          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>

<!--        <el-header></el-header>-->

        <el-main class="scrollable-main">
          <el-scrollbar always>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>


    </el-container>
  </div>


</template>

<style scoped>
.fixed-aside {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100; /* 确保侧边栏在上方 */
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 200px; /* 让头部与侧边栏对齐 */
  width: calc(100% - 200px); /* 让头部宽度适应剩余空间 */
  z-index: 99; /* 确保头部在侧边栏上方 */
}

.scrollable-main {
  margin-left: 10px; /* 为了让内容不被侧边栏覆盖 */
  margin-top: 10px; /* 为了避免内容被固定的 header 遮挡 */
  overflow-y: auto; /* 让 el-main 产生滚动条 */
  height: calc(100vh - 60px); /* 保证 el-main 的高度适应剩余空间 */
}
</style>
