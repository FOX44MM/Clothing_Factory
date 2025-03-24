<template>
  <h2>薪资管理</h2><br>

  <div class="search">

    <el-date-picker
        v-model="mouth"
        type="month"
        placeholder="选择一个月份"
    />
    <el-button @click="search">搜索</el-button>

  </div>

</template>

<script setup>
import 'dayjs/locale/zh-cn'
import {ref} from 'vue'

let mouth = ref('')

function search(){
  console.log(mouth.value)
}

</script>

<style scoped>

</style>