<template>
  <h1>款式管理</h1>
  <hr>

  <!--  <el-button @click="getAllStyle">获取</el-button>-->
  <el-button type="success" @click="showNewStyle = true">添加</el-button>
  <br><br>
  <!-- 主表 -->
  <el-table :data="list" border stripe style="width: 100%" @selection-change="handleSelectionChange">
    <!--  复选框  -->
    <!--    <el-table-column type="selection" width="40">-->
    <!--    </el-table-column>-->

    <el-table-column
        label="款式"
        prop="styleName"
        width="100px"
    >
    </el-table-column>
    <el-table-column
        label="客户"
        prop="customerName"
        width="140px"
    ></el-table-column>
    <el-table-column
        label="款号"
        prop="styleNum"
        width="180px"
    ></el-table-column>
    <el-table-column
        label="备注"
        prop="remark"

    ></el-table-column>
    <el-table-column
        label="创建时间"
        prop="createTime"
        width="180px"
    ></el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger" @click="showDeleteStyle(scope.row)">删除</el-button>
        <el-button type="primary" @click="showEditStyleDialog(scope.row)">编辑</el-button>
        <el-button @click="showStyleWp = true">修改工序</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- --------------------------------------对话框-------------------------------------- -->
  <el-dialog title="新建款式" v-model="showNewStyle" draggable>
    <el-form :model="newStyle">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.styleName" placeholder="款名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.styleNum" placeholder="款号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="newStyle.customerName" placeholder="客户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="success" @click="saveStyle">保存</el-button>
          <el-button type="warning" @click="clearNewStyle">清除</el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <el-input type="textarea" v-model="newStyle.remark" placeholder="备注" :autosize="{minRows:6}"></el-input>
      </el-form-item>


    </el-form>
  </el-dialog>
  <!-- 修改款式 -->
  <el-dialog title="修改款式" v-model="showEditStyle" draggable>
    <el-form :model="editStyleInfo">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="editStyleInfo.styleName" placeholder="款名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="editStyleInfo.styleNum" placeholder="款号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="editStyleInfo.customerName" placeholder="客户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="success" @click="editStyle">确认</el-button>
          <el-button type="warning" @click="clearNewStyle">清除</el-button>
        </el-col>
      </el-row>

      <el-form-item>
        <el-input type="textarea" v-model="editStyleInfo.remark" placeholder="备注" :autosize="{minRows:6}"></el-input>
      </el-form-item>


    </el-form>
  </el-dialog>

  <!-- 款式设置工序 对话框 -->
  <el-dialog draggable title="款式的工序信息" v-model="showStyleWp" width="80%">
    <!-- todo 快速添加工序  -->
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="快速添加工序"></el-input>
        </el-col>

        <el-col :span="6">
          <el-button>提交</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div>
      <el-button @click="addWptoStyle">添加工序</el-button>
      <el-table>

        <el-table-column label="操作"></el-table-column>
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="编码"></el-table-column>
        <el-table-column label="工序"></el-table-column>
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
      <el-table-column></el-table-column>
    </el-table>
  </el-dialog>

  <!-- 删除警告对话框 -->
  <el-dialog
      v-model="deleteStyleWarning"
      title="警告"
      width="500"
      align-center
  >
    <span>请确认是否删除！！！</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteStyleWarning = false">取消</el-button>
        <el-button type="primary" @click="deleteStyle">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>
<!---------------------------------- js代码 -------------------------------------->
<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

// 页面加载后运行
onMounted(() => {
  getAllStyle()
})

// --------------------------- 变量区 ---------------------------
var apiUrl = "http://localhost:8081/api/style"

let list = ref([])  // 主表内容

let showNewStyle = ref(false);  //显示  新款式   对话表
let showEditStyle = ref(false); //显示  编辑款式 对话框
let deleteStyleWarning = ref(false);  // 显示删除警告
let showStyleWp = ref(false); // 显示 款式的工序 对话框
let showWptoStyle = ref(false); // 显示 工序添加到款式 对话框

// --------------------------- 函数区 -----------------------------

// todo 将新款式和编辑款式融合为一个使用
// 添加新款式
let newStyle = reactive({
  styleName: "",
  styleNum: "",
  customerName: "",
  remark: "",
})
// 编辑款式
let editStyleInfo = reactive({
  styleName: "",
  styleNum: "",
  customerName: "",
  remark: "",
})

let selectedRows = reactive([])
//todo 现已加入 复选框设置，继续完善其功能
//todo 提交保存的时候将选中的styleNum 款号 提交上去
const handleSelectionChange = (val) => {
  selectedRows.value = val;
  console.log("当前选中的数据:", selectedRows.value);
  console.log(selectedRows.value.map((item) => item.styleNum))
};


//todo 工序添加


//todo 款式修改
function showEditStyleDialog(row) {
  console.log("修改款式")

  // 获取行内信息，赋值给对话框中的内容
  editStyleInfo.styleName = row.styleName;
  editStyleInfo.styleNum = row.styleNum;
  editStyleInfo.customerName = row.customerName;
  editStyleInfo.remark = row.remark;

  showEditStyle.value = true; // 显示对话框
}

function editStyle() {
  //  编辑款式后向后端发送修改
  //todo 判断修改的款号是否在数据库中已存在
  //todo 可修改款号
  axios.put(apiUrl, {
    styleName: editStyleInfo.styleName,
    styleNum: editStyleInfo.styleNum,
    customerName: editStyleInfo.customerName,
    remark: editStyleInfo.remark,
  })

  showEditStyle.value = false; // 关闭对话框

  ElMessage.success({
    message: "修改成功"
  })
  // 刷新数据
  refreshTable()
}

let DeleteStyleNum = ref("")

function showDeleteStyle(row) {
  deleteStyleWarning.value = true;  // 是否删除警告
  console.log("删除款式:" + row.styleNum)
  DeleteStyleNum.value = row.styleNum;
}

function deleteStyle() {
  axios.delete(apiUrl + '/' + DeleteStyleNum.value)
      .then(res => {
      })

  deleteStyleWarning.value = false;  // 关闭删除警告

//  提示
  ElMessage.success({
    message: "成功删除员工",
  })
  // 重新加载

  refreshTable()
}

function clearNewStyle() {  //清除
  newStyle.styleName = "";
  newStyle.styleNum = "";
  newStyle.customerName = "";
  newStyle.remark = "";
}


// 保存款式
function saveStyle() {
  // console.log("保存款式")
  // todo 判断数据中是否已存在相同款号，如果存在弹出错误
  axios.post(apiUrl,
      {
        styleName: newStyle.styleName,
        styleNum: newStyle.styleNum,
        customerName: newStyle.customerName,
        remark: newStyle.remark,
      }
  ).then(res => {
    // todo 判断返回内容的结果是否添加成功
    ElMessage.success({
      message: "成功添加员工"
    })
  })

  showNewStyle.value = false;
  refreshTable()
}

// 刷新表格
function refreshTable() {
  setTimeout(() => {
    getAllStyle()
  }, 200)
}

function getAllStyle() {
  list.value = []
  axios.get(apiUrl)
      .then((res) => {
        // console.log(data)
        list.value = res.data.data;
      })
}

// 添加工序到款式
function addWptoStyle() {

}

</script>

<style scoped>
</style>