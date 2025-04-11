<template>
  <h1>工序信息</h1>
  <hr>


  <el-button @click="showAddWpDialog = true" type="primary">添加</el-button>
  <br><br>

  <el-dialog v-model="showAddWpDialog" title="新建工序">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="工序号" v-model="NewWp.code"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="工序名" v-model="NewWp.wp"></el-input>
      </el-col>


      <el-col :span="12">
        <!--    todo添加    -->
        <el-button @click="addWp" type="primary">确定</el-button>
      </el-col>
    </el-row>

    <hr>

    <el-input type="textarea" placeholder="备注" :autosize="{minRows:6}" v-model="NewWp.remark"></el-input>
  </el-dialog>

  <el-dialog v-model="showEditWpDialog" title="编辑工序">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="工序号" v-model="editWp.code"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="工序名" v-model="editWp.wp"></el-input>
      </el-col>


      <el-col :span="12">
        <!--    todo添加    -->
        <el-button @click="EditWpDialog" type="primary">提交</el-button>
      </el-col>
    </el-row>

    <hr>

    <el-input type="textarea" placeholder="备注" :autosize="{minRows:6}" v-model="editWp.remark"></el-input>
  </el-dialog>


  <!--  表格  -->
  <el-table :data="list" border stripe style="width: 100%" v-loading>
    <el-table-column prop="code" label="编码"></el-table-column>
    <el-table-column prop="wp" label="工序"></el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
    <!--    <el-table-column prop="status" label="状态" width="80"></el-table-column>-->
    <el-table-column label="操作">
      <template #default="scope">
        <el-button v-if="scope.row.status" type="danger" @click="setStatus(scope.row,false)">禁用</el-button>

        <template v-else>
          <el-button v-if="!scope.row.status" type="success" @click="setStatus(scope.row,true)">启用</el-button>
          <el-button v-if="!scope.row.status" type="warning" @click="EditWp(scope.row)">编辑</el-button>

          <!--     在此处使用气泡弹出来确认     -->
          <!--          <el-button type="danger" @click="deleteWp(scope.row)">删除</el-button>-->
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
              <el-button
                  type="danger"
                  size="small"
                  @click="deleteWp(scope.row)"
              >
                确定!
              </el-button>
            </template>
          </el-popconfirm>


        </template>

      </template>
    </el-table-column>

  </el-table>

</template>
<!----------------------------------- js ------------------------------------>

<script setup>
//todo 添加成功或失败后 弹出提示框
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {base_api} from "../utils/api.js";
import {ElMessage} from "element-plus";
import {Delete} from '@element-plus/icons-vue'


var apiUrl = base_api + '/api/wp';

let showAddWpDialog = ref(false);
let showEditWpDialog = ref(false);

let list = ref([])

onMounted(() => {
  getAllWp()
})

let NewWp = reactive({
  code: "",
  wp: "",
  remark: ""
})

let editWp = reactive({
  id: 0,
  code: "",
  wp: "",
  remark: "",
  status: false,
})

// 添加新工序
function addWp() {
  axios.post(apiUrl, {
    code: NewWp.code,
    wp: NewWp.wp,
    remark: NewWp.remark,
  }).then(res => {

  })
  // console.log(NewWp.wp)
  NewWp.code = ""
  NewWp.wp = "";
  NewWp.remark = "";

  showAddWpDialog.value = false;
  refreshTable()
  ElMessage({
    type: "success",
    message: "添加成功"
  })
}

// 删除工序
function deleteWp(row) {
  console.log("要删除的code：", row.code)
  axios.delete(apiUrl + '/' + row.code)
  refreshTable()
  ElMessage({
    type: "success",
    message: "删除完成"
  })
  // console.log(row)
}

// 编辑工序
function EditWp(row) {
  editWp.id = row.id
  editWp.code = row.code
  editWp.wp = row.wp
  editWp.remark = row.remark
  editWp.status = row.status

  showEditWpDialog.value = true
}

function setStatus(row, bool) {
  axios.put(apiUrl, {
    id: row.id,
    code: row.code,
    wp: row.wp,
    remark: row.remark,
    status: bool
  })
  console.log("修改状态")
  refreshTable()
}

function EditWpDialog() {
  axios.put(apiUrl, {
    id: editWp.id,
    code: editWp.code,
    wp: editWp.wp,
    remark: editWp.remark,
    status: editWp.status
  }).then(res => {
    showEditWpDialog.value = false
    // todo  提示修改成功
  })


  refreshTable()
  ElMessage({
    type: "success",
    message: "修改完成"
  })
}

function refreshTable() {
  setTimeout(() => {
    getAllWp()
  }, 200)
}

function getAllWp() {
  axios.get(apiUrl + "/list")
      .then((response) => {
        list.value = response.data.data;
      })
}

function disableWp(row) {
  console.log(row)
}

</script>

<style scoped>

</style>