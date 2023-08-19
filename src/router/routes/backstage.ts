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
                        name: 'list',
                        path: '',
                        component: () => import('@/views/backstage/BlogManagement/BlogList.vue')
                    },
                    {
                        name: 'edit',
                        path: 'edit',
                        component: () => import('@/views/backstage/BlogManagement/BlogEdit.vue')
                    },
                    {
                        name: 'editPaper',
                        path: 'editPaper',
                        component: () => import('@/views/backstage/PaperManagement/PaperEdit.vue')
                    },
                    {
                        name: 'mydocuments',
                        path: 'mydocuments',
                        component: () => import('@/views/backstage/PaperManagement/PaperList.vue')
                    },
                    {
                        name: 'literaturerecords',
                        path: 'literaturerecords',
                        component: () => import('@/views/backstage/PaperManagement/PaperEdit.vue')
                    }
                ]
            }
        ],
        meta: {
            role: 'ADMIN'
        }
    }
]