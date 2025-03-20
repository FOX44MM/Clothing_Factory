import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import emp from './components/employee/emp.vue'
import tableEmployee from './components/employee/tableEmployee.vue'
import addEmployee from './components/employee/addEmployee.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/emp' },
        ,
        {
            path: '/emp',
            component: emp,
            children: [
                {path: 'tableEmployee', component: tableEmployee},
                {path: 'addemployee', component: addEmployee},

            ]
        },

    ]
})

export default router