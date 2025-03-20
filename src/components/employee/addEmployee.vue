<script setup>

</script>

<template>
  <form>
    <p>姓名：</p><input type="text" name="" id=""><br>
    <p>电话号：</p><input type="number" maxlength="11" name="" id=""><br>

    <p>性别：</p>
    <select name="" id="">
      <option value="女">女</option>
      <option value="男">男</option>
    </select><br>

    <button type="submit">添加</button>
  </form>


</template>

<style scoped>
  p{
    display: inline-block;
    margin: 8px;
  }
</style>