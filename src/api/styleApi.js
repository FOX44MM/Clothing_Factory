import {apiClient} from "./api.js";
import style from "../components/styleManagement/style.vue";
import {ElMessage} from "element-plus";

// 增
export async function addStyle(style) {
    await apiClient.post('/style', style);
}

// 删
export async function deleteStyleById(id) {
    await apiClient.delete('/style/' + id);
}

// 改
export async function updateStyle(style) {
    await apiClient.put('/style', style);
}


// 查
export async function getAllStyle(pageNum, pageSize) {
    let Response = await apiClient.get('/style/list', {
        params: {
            pageNum: pageNum,
            pageSize: pageSize
        }
    });
    return Response.data.data;
}