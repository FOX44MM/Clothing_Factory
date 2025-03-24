<template>
  <el-button @click="getAllWp">查询</el-button>
  <el-table :data="list" border stripe style="width: 100%">
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="code" label="编码"></el-table-column>
    <el-table-column prop="wp" label="工序"></el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger">禁用</el-button>
      </template>
<!--      <template>-->
<!--        <el-button>启用</el-button>-->
<!--        <el-button>编辑</el-button>-->
<!--        <el-button>删除</el-button>-->
<!--      </template>-->
    </el-table-column>

  </el-table>

</template>

<script setup>
import axios from "axios";
import {ref} from "vue";

var apiUrl = 'http://localhost:8081/api/wp';

let list = ref([])

function getAllWp() {
  axios.get(apiUrl)
      .then((response) => {
        list.value = response.data.data;
      })
}
</script>

<style scoped>

</style>