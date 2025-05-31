<template>
  <h1>款式管理</h1>
  <hr>

  <el-button type="success" @click="handleAddStyleButton">添加</el-button>
  <br><br>
  <!-- 主表 -->
  <div style="height:100%" class="table-container">
    <!--  ----------------表格----------------  -->
    <el-table :data="list" border stripe style="width: 100%">

      <!--          <el-table-column type="selection" width="40"/>-->
      <!--      <el-table-column label="唯一值" prop="id" width="60px"/>-->
      <el-table-column
          label="款式"
          prop="styleName"
          width="180px"
      />
      <el-table-column
          label="客户"
          prop="customerName"
          width="80px"
      />
      <el-table-column
          label="款号"
          prop="styleNum"
          width="180px"
      />
      <el-table-column
          label="备注"
          prop="remark"

      />
      <el-table-column
          label="创建时间"
          prop="createTime"
          width="180px"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm v-if="!scope.row.status"
                         title="确定删除?"
                         width="220"
                         :icon="Delete"
                         icon-color="#ff6e63"
          >

            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>

            <template #actions="{ confirm, cancel }">
              <el-button size="small" @click="cancel">取消</el-button>
              <el-button type="danger" size="small" @click="deleteStyleById(scope.row)">确定!</el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" @click="handleEditStyleButton(scope.row)">编辑</el-button>
          <el-button @click="showStyleWp = true">修改工序</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <!--  总数total 每页数量 当前页数current-page 每页数量选择器  -->

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

  <!-- --------------------------------------修改和新增 款式 对话框-------------------------------------- -->
  <el-dialog :title="styleEditDialog.title" v-model="styleEditDialog.visible" draggable>
    <el-form :model="style">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="款名:">
            <el-input v-model="style.styleName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="款号:">
            <el-input v-model="style.styleNum" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名:">
            <el-input v-model="style.customerName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="success" @click="handleConfirmButton">确认</el-button>
          <el-button type="warning" @click="clearNewStyle">清除</el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <el-input type="textarea" v-model="style.remark" placeholder="备注" :autosize="{minRows:6}"></el-input>
      </el-form-item>


    </el-form>
  </el-dialog>
  <!-- ---------------------------------------------------------------------------- -->

  <!-- 款式设置工序 对话框 -->
  <el-dialog draggable title="款式的工序信息" v-model="showStyleWp" width="80%">
    <!-- todo 快速添加工序  -->
    <el-form>
      <el-row :gutter="8">
        <el-col :span="6">
          <el-input placeholder="快速添加工序"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button>添加</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="success">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <div>
      <el-button @click="addWptoStyle">添加工序</el-button>
      <el-table>

        <el-table-column label="操作"/>
        <el-table-column label="序号"/>
        <el-table-column label="编码"/>
        <el-table-column label="工序"/>
      </el-table>
    </div>


    <!--  todo 价格合集  -->
  </el-dialog>

  <!-- 添加工序到款式 -->
  <el-dialog v-model="showWptoStyle">
    <el-table>
      <el-table-column>
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column/>
    </el-table>
  </el-dialog>


</template>

<!---------------------------------- js代码 -------------------------------------->
<script setup>

import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {Delete} from "@element-plus/icons-vue";
import * as api from "../../api/styleApi.js";

// 页面加载后运行
onMounted(() => {
  getAllStyle()
})

// --------------------------- 变量区 ---------------------------
var apiUrl = "http://localhost:8081/api/style"

let list = ref([])  // 表内容

let style = reactive({  // 款式内容
  id: "",
  styleName: "",
  styleNum: "",
  customerName: "",
  remark: "",
})

let styleEditDialog = reactive({  // 对话框属性
  title: "",
  visible: false
})

let total = ref(0);
let pageSize = ref(10);
let pageNum = ref(1);
let handleConfirmButton;
let showStyleWp = ref(false); // 显示 款式的工序 对话框
let showWptoStyle = ref(false); // 显示 工序添加到款式 对话框

// --------------------------- 函数区 -----------------------------

// 清除款式内容
function clearStyle() {
  style.id = "";
  style.styleName = "";
  style.styleNum = "";
  style.customerName = "";
  style.remark = "";
}



function handleAddStyleButton() { // 添加按钮
  clearStyle()
  styleEditDialog.visible = true;
  styleEditDialog.title = "添加新款式";

  handleConfirmButton = addStyle;
}

function handleEditStyleButton(row) { // 编辑按钮
  styleEditDialog.visible = true;
  styleEditDialog.title = "修改款式";
  handleConfirmButton = updateStyle;
  style.id = row.id;
  style.styleName = row.styleName;
  style.styleNum = row.styleNum;
  style.customerName = row.customerName;
  style.remark = row.remark;


}

// 新增款式
async function addStyle() {
  await api.addStyle(style) // 添加新款式
  ElMessage.success({message: "成功添加员工"})  // 公告
  styleEditDialog.visible = false;
  fetchList()
}

// 删除款式
async function deleteStyleById(row) {
  await api.deleteStyleById(row.id)
  ElMessage.success({
    message: "成功删除员工",
  })
  fetchList()  // 刷新表格
}

// 修改款式信息
async function updateStyle() {
  await api.updateStyle(style)
  ElMessage.success({
    message: "修改成功"
  })
  styleEditDialog.visible = false; // 关闭对话框
  clearStyle()  // 清空
  // 刷新数据
  fetchList() // 刷新数据
}


function clearNewStyle() {  //清除
  style.styleName = "";
  style.styleNum = "";
  style.customerName = "";
  style.remark = "";
}


// 刷新表格
function fetchList() {
  setTimeout(() => {
    getAllStyle()
  }, 200)
}

async function getAllStyle() {
  let data = await api.getAllStyle(pageNum.value, pageSize.value);
  list.value = data.list
  total = data.total
}

function getProcedureList() {
  axios.get("http://localhost:8081/api/wp" + "/list")
}

// 添加工序到款式
function addWptoStyle() {

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