import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import * as consty from '@/types/Const'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/index',
            component: () => import('@/views/index.vue'),
        },
        {
            path: '/articles',
            component: () => import('@/views/Articles.vue'),
        },
        {
            path: '/about',
            component: () => import('@/views/About.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/index',
        }
    ]
})

export default router