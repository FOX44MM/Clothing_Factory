<template>
  <el-button @click="getAllStyle">获取</el-button>
  <el-button type="success" @click="showNewStyle = true">添加</el-button>
  <br><br>

  <el-table :data="list" border stripe style="width: 100%">
    <el-table-column
        label="款式"
        prop="styleName"
    ></el-table-column>
    <el-table-column
        label="客户"
        prop="customerName"
    ></el-table-column>
    <el-table-column
        label="款号"
        prop="styleNum"
    ></el-table-column>
    <el-table-column
        label="备注"
        prop="remark"
    ></el-table-column>
    <el-table-column
        label="创建时间"
        prop="createTime"
    ></el-table-column>
  </el-table>

  <el-dialog title="新建款式" v-model="showNewStyle">
    <el-form :model="newStyle">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.styleName" placeholder="款名" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.styleNum" placeholder="款号" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.customerName" placeholder="客户姓名" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="success">保存</el-button>
          <el-button type="warning">取消</el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <el-input type="textarea" v-model="newStyle.remark" placeholder="备注" :autosize="{minRows:6}"></el-input>
      </el-form-item>


    </el-form>
  </el-dialog>
</template>

<script setup>
import axios from "axios";
import {reactive, ref} from "vue";

var apiUrl = "http://localhost:8081/api/style"

let list = ref([])

let showNewStyle = ref(false);

let newStyle = reactive({
  styleName: "",
  styleNum: "",
  customerName: "",
  remark: "",
})

function saveStyle() {
  console.log("保存款式")
  axios.post("http://localhost:8080/addStyle",
      {
        styleName:styleName.value,
        styleNum:styleNum.value,
        customerName:customerName.value,
        comment:comment.value
      }
  ).then(res => {
    console.log(res)
  })
}

function getAllStyle() {
  console.log("获取所有的款式")
  axios.get(apiUrl)
      .then((res) => {
        list.value = res.data.data
        console.log(list.value)

      })
}
</script>

<style scoped>
</style>