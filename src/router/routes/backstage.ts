import { createRouter } from "vue-router"

export default [
    {
        name: 'login',
        path: '',
        component: () => import('@/views/backstage/Login.vue'),
    },
    {
        name: 'backindex',
        path: 'index',
        component: () => import('@/views/backstage/index.vue'),
        children: [
            {
                name: 'usercenter',
                path: '',
                component: () => import('@/views/backstage/UserCenter.vue')
            },
            {
                name: 'manage',
                path: 'manage',
                component: () => import('@/views/backstage/BlogManagement.vue'),
                children:[
                    {
                        name: 'bloglist',
                        path: '',
                        component: () => import('@/views/backstage/BlogManagement/BlogList.vue')
                    },
                    {
                        name: 'blogedit',
                        path: 'edit',
                        component: () => import('@/views/backstage/BlogManagement/BlogEdit.vue')
                    }
                ]
            }
        ]
    }
]