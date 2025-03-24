<template>
  <form>
    <input type="text" maxlength="8" v-model="name" placeholder="姓名"><br>
    <input type="text" maxlength="11" minlength="11" v-model="phone" placeholder="电话号"><br>

    <p>性别：</p>
    <select v-model="gender">
      <option value="女" selected>女</option>
      <option value="男">男</option>
    </select><br>

    <button @click="addemp">添加</button>
  </form>


</template>


<script setup>

import {ref} from "vue";
import axios from "axios";

let name = ref()
let phone = ref()
let gender = ref()

// 添加员工
function addemp() {
  console.log("添加员工")
  console.log(name.value, phone.value, gender.value)

  axios.post('/api/employee', {
    name: name.value,
    phone: phone.value,
    gender: gender.value
  }).then(res => {
    // 添加成功
    console.log("请求成功！")
    console.log(res)
  })
}

</script>


<style scoped>
p {
  display: inline-block;
  margin: 8px;
}
</style>