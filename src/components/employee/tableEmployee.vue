<script setup>
import {ref} from "vue";
import axios from "axios";
function openWindow(){
  var { href } = this.$router.resolve({
    path: `/addemployee`, // route路由
    // query: { // 参数
    //   id: xxxxx,
    //   paperName: xxxxxx
    // }
  })
  var name="创建员工"; // 网页名称，可为空;
  var iWidth=1000;   // 弹出窗口的宽度;
  var iHeight=500;  // 弹出窗口的高度;
  var screenHeight = window.screen.height;  // 获得屏幕的高;
  var screenWidth = window.screen.width;   // 获得屏幕的宽;
  var iTop = (screenHeight - 30 - iHeight) / 2;  //获得窗口的垂直位置;
  var iLeft = (screenWidth - 10 - iWidth) / 2;   //获得窗口的水平位置;
  var configuration = `
    height=${iHeight},
    innerHeight=${iHeight},
    width=${iWidth},
    innerWidth=${iWidth}',
    top=${iTop},
    left=${iLeft},
    toolbar=no,
    menubar=no,
    scrollbars=auto,
    resizeable=no,
    location=no,
    status=no
  `
  window.open(href, title, configuration);
}


let limit = ref(10);

let list = ref([
  {name: "n", phone: "123456", gender: "男"},
  {name: "l", phone: "123456", gender: "男"},
  {name: "c", phone: "123456", gender: "男"},
  {name: "f", phone: "123456", gender: "男"},
  {name: "o", phone: "123456", gender: "男"}
])

// 获取所有的员工
function getAllEmp() {
  axios.get("/api/employee").then((result) => {

  }).catch((err) => {
    console.log("发生错误！")
    console.log(err);
  })
}

function newEmployee() {
  window.open(
      "#/addemployee",
      "_blank",
      "height=400,width=400," +
      "resizable=no,location=no," +
      "scrollbars=yes,location=no,"
  );
}
</script>

<template>
  <hr>
  <!-- 操作 -->

  <!--  查询 按姓名或工号 -->
  <p>姓名：</p><input type="text" name="" id="">
  <p>工号：</p><input type="text" name="" id="">
  <button>查询</button>
  <!--  新建-->
  <button @click="newEmployee">新建</button>

  <!--  重置-->
  <button type="reset">重置</button>


  <!-- 表格 -->
  <table>
    <thead>
    <tr>
      <th>工号</th>
      <th>姓名</th>
      <th>性别</th>
      <th>电话</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in list">
      <td>{{ index }}</td>
      <th>{{ item.name }}</th>
      <th>{{ item.gender }}</th>
      <th>{{ item.phone }}</th>
      <th>
        <button type="button" @click="sayname(index)">编辑</button>
      </th>
    </tr>
    </tbody>
  </table>

  <!--显示多少内容-->
  <select v-model="limit">
    <option value=10>10</option>
    <option value=20>20</option>
    <option value=50>50</option>
    <option value=100>100</option>

  </select>
</template>

<style scoped>
  p{
    display: inline-block;
  }
</style>