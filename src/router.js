import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/style'},
        ,
        {
            path: '/emp',
            component: () => import('./components/employee/emp.vue'),
            children: [
                {path: 'tableEmployee', component: () => import('./components/employee/tableEmployee.vue'),},
                {path: 'addemployee', component: () => import('./components/employee/addEmployee.vue'),},

            ]
        },
        {
            path: '/salary',
            component: () => import('./components/salaryManagement/salary.vue'),
        },
        {
            path: '/style',
            component: () => import('./components/styleManagement/style.vue')
        },
        {
            path: '/wp',
            component: () => import('./components/workingprocedure/Wp.vue'),
        },
        {
            path: '/test',
            component: () => import('./components/test.vue'),
        }

    ]
})

export default router