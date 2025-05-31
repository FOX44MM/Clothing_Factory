import axios from "axios";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {apiUrl} from "./api.js";

let apiClient = axios.create({
    baseURL: apiUrl,
    headers: {},
    timeout: 5000,
})

// 增加用户
export async function addEmp(emp) {
    await apiClient.post('/employee', emp);
}

// 删除用户
export async function deleteEmpById(id) {
    await apiClient.delete('/employee/' + id)
}

// 修改用户
export async function updateEmpById(emp) {
    await apiClient.put('/employee', emp);
}

// todo 查询用户
export async function searchEmp(id) {

}

// 获取所有用户
export async function getAllEmp(pageNum, pageSize) {
    let Response = await apiClient.get('/employee/list',{
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
        }
    })
    return Response.data.data
}