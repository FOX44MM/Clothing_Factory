<template>
  <hr>
  <!-- 操作 -->

  <!--  查询 按姓名 -->
  <form>
    <el-input style="width:200px" placeholder="姓名"></el-input>

    <el-button  @click="getAllEmp" style="margin: 10px">查询</el-button>

  </form>

  <el-table :data="list" style="width: 100%" border stripe >
    <el-table-column prop="id" label="工号" width="80px"></el-table-column>
    <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
    <el-table-column prop="gender" label="性别" width="80px"></el-table-column>
    <el-table-column prop="phoneNumber" label="电话" width="200px"></el-table-column>
    <el-table-column prop="department" label="部门" width="80px"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
        <!--  将工号插入  -->
        <el-button size="small" type="danger" @click="deleteEmpById(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

// let apiUrl = "/api/employee"  // api 地址
let apiUrl = "http://localhost:8081/api/employee"  // api 地址
let search = ref("")
let list = ref([])      // 员工列表
let limit = ref(10);    // 显示限制

onMounted(() => {
  console.log("组件加载完成")
  // 网页加载时运行
  getAllEmp() //加载所有员工
})

// function test(row) {
//   console.log(row.id)
//
// }

//  获取所有的员工
function getAllEmp() {
  axios.get(
      apiUrl
  ).then((result) => {
    console.log("获取所有员工成功！")
    console.log(result.data.data)
    list.value = result.data.data;  // 将获取到的数据 复制到表格当中

  }).catch((err) => {
    console.log("发生错误！")
    console.log(err);
  })
}

//  根据工号或姓名查找员工
function getEmpByNameOrId() {
  axios.get(apiUrl)
      .then((result) => { //查找成功

      })
}

// 通过工号删除员工
function deleteEmpById(row) {
  var id = row.id;
  console.log("访问api：" + apiUrl + '/' +id);
  if (confirm("请确定是否删除")) {
    axios.delete(apiUrl + '/' + id)
        .then((result) => { //  请求成功
          console.log("请求成功！");
          getAllEmp();  //  每次删除成功后都重新加载员工
        }).catch((err) => { //  请求失败
      console.log("请求失败！");
      console.log(err);
    })
  } else {
    console.log("取消删除")
  }


}
</script>


<style scoped>
p {
  display: inline-block;
  margin: 10px;
}
button {
  padding: 10px;
}

table, th, td {
  border: 1px solid;
}
</style>