<template>
  <h2>用户管理</h2>
  <hr>

  <!-- todo 查询 按姓名 -->
  <form>
    <el-input style="width:200px" placeholder="姓名"></el-input>

    <el-button @click="fetchList" style="margin: 10px">查询</el-button>
    <el-button @click="handleAddEmp" type="primary">添加用户</el-button>
  </form>
  <!-- 新员工添加弹窗 -->
  <el-dialog draggable v-model="EmpEditDialog.visible" style="max-width: 300px" v-bind:title="EmpEditDialog.title">
    <el-form :model="emp">
      <el-form-item label="姓名：">
        <el-input v-model="emp.name" placeholder="新用户的姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="emp.gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话：">
        <!--    todo对电话进行验证    -->
        <el-input placeholder="11位电话号码" v-model="emp.phoneNumber" maxlength="11" x></el-input>
      </el-form-item>
      <el-form-item label="部门：">
        <el-select v-model="emp.department">
          <el-option label="车间" value="车间"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="EmpEditDialog.visible = false">取消</el-button>
    <el-button type="success" @click="handleAction">确认</el-button>
  </el-dialog>

  <div class="table-container">
    <el-table :data="list" style="width: 100%" border stripe table-layout="fixed">
      <el-table-column prop="id" label="工号" width="80px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80px"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话" width="200px"></el-table-column>
      <el-table-column prop="department" label="部门" width="80px"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleUpdateEmp(scope.row)">修改</el-button>

          <el-popconfirm
              width="220"
              :icon="Delete"
              icon-color="#ff6e63"
              title="确认删除？"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>

            <template #actions="{ confirm, cancel }">
              <el-button size="small" @click="cancel">取消</el-button>
              <el-button type="danger" size="small" @click="deleteEmpById(scope.row)">确定!</el-button>
            </template>

          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <br>

    <div class="pagination-container">
      <el-pagination
          layout="prev, pager, next,sizes"
          background
          v-model:total="total"
          :page-sizes="[10, 20, 50]"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          @change="fetchList"
      />
    </div>
  </div>
</template>


<script setup>
import {onMounted, reactive, ref} from "vue";
import {Delete} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import * as api from "../../api/empApi.js";

let handleAction;

let total = ref(20)      //总条目数
let pageNum = ref(1);   //页码
let pageSize = ref(10); //每页显示的数量

let emp = reactive({
  id: "",
  name: "",
  phoneNumber: "",
  department: "",
  gender: "",
})

let EmpEditDialog = reactive({
  title: "",
  visible: false,
})

let list = ref([])      // 员工列表


// 网页加载时运行
onMounted(() => {
  fetchList()  // 加载所有员工
})

//-------------按钮事件---------------

function handleAddEmp() {
  clearEmp()  // 清空临时数据
  EmpEditDialog.title = "添加新用户";
  EmpEditDialog.visible = true //显示对话框

  handleAction = addEmp
}

function handleUpdateEmp(row) {
  EmpEditDialog.title = "修改用户";
  EmpEditDialog.visible = true //显示对话框

  emp.id = row.id
  emp.name = row.name
  emp.phoneNumber = row.phoneNumber
  emp.department = row.department
  emp.gender = row.gender

  handleAction = updateEmp
}

//----------------------------

//  获取所有的员工
async function fetchList() {
  let data = await api.getAllEmp(pageNum.value, pageSize.value);
  list.value = data.list;
  total.value = data.total;
}

//添加新员工
async function addEmp() {
  try {
    await api.addEmp(emp);  // 添加新用户
    ElMessage({
      type: "success",
      message: "添加成功!"
    })

    await fetchList() //刷新表格
    EmpEditDialog.visible = false //关闭对话框


  } catch (err) { // 发生错误
    ElMessage({type: "error", message: err})
    console.log(err)
  }
}

// 通过工号删除员工
async function deleteEmpById(row) {
  try {
    await api.deleteEmpById(row.id) // 删除
    ElMessage({
      type: "success",
      message: "删除成功！"
    })  //显示删除信息

    await fetchList()  // 刷新表格
  } catch (err) { // 发生错误
    ElMessage({type: "error", message: err})
    console.log(err)
  }

}

// 修改用户信息
async function updateEmp() {
  try {
    await api.updateEmpById(emp)
    ElMessage({
      type: "success",
      message: "更新成功！"
    })

    await fetchList()  // 刷新表格
    EmpEditDialog.visible = false // 关闭对话框
    clearEmp()  // 清空临时数据

  } catch (err) {
    ElMessage({type: "error", message: err})
    console.log(err)
  }
}

// --------------------待完成--------------------
// todo 根据工号或姓名查找员工
function getEmpByNameOrId() {

}


// -------------------基础功能----------------------
function clearEmp() {
  console.log("清除内容")
  emp.id = "";
  emp.name = "";
  emp.department = "";
  emp.gender = "";
  emp.phoneNumber = "";
}
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 16px;
  box-sizing: border-box;
}

.el-table {
  flex: 1;
}

.pagination-container {
  display: flex;
  justify-content: right;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>