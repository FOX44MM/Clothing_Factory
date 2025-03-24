<template>
  <form>
    <el-input placeholder="款名" style="width: 200px; padding: 4px" v-model="styleName"></el-input>
    <el-input placeholder="款号" style="width: 200px; padding: 4px" v-model="styleNum"></el-input>
    <el-input placeholder="客户姓名" style="width: 200px; padding: 4px" v-model="customerName"></el-input>
    <el-button type="success"
               @click="saveStyle"

    >保存</el-button>
    <el-input type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              style="width: 600px; padding: 4px; "
              placeholder="备注"
              v-model="comment"
    ></el-input>
  </form>


</template>

<script setup>
import {ref} from "vue"
import axios from "axios";

let styleName = ref("")
let styleNum = ref("")
let customerName = ref("")
let comment = ref("")

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

</script>

<style scoped>

</style>