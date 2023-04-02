import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import * as consty from '@/types/Const'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue'),
        },
        {
            name: 'articles',
            path: '/articles',
            component: () => import('@/views/articles/Articles.vue'),
        },
        {
            name: 'detail',
            path: '/articles/detail',
            component: () => import('@/views/articles/ArticleDetail.vue')
        },
        {
            name: 'about',
            path: '/about',
            component: () => import('@/views/about/About.vue'),
        },
        {
            name: 'message',
            path: '/message',
            component: () => import('@/views/message-board/MessageBoard.vue')
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/index',
        }
    ]
})

export default router