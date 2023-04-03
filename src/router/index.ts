import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/ForeGround.vue'),
            children: [
                {
                    name: 'index',
                    path: '',
                    component: () => import('@/views/foreground/index.vue'),
                },
                {
                    name: 'articles',
                    path: '/articles',
                    component: () => import('@/views/foreground/Articles.vue'),
                },
                {
                    name: 'detail',
                    path: '/articles/detail',
                    component: () => import('@/views/foreground/ArticleDetail.vue')
                },
                {
                    name: 'about',
                    path: '/about',
                    component: () => import('@/views/foreground/About.vue'),
                },
                {
                    name: 'message',
                    path: '/message',
                    component: () => import('@/views/foreground/MessageBoard.vue')
                }
            ]
        },
        {
            path: '/backstage',
            component: () => import('@/views/BackStage.vue'),
            children: [
                {
                    name: 'backindex',
                    path: '/backindex',
                    component: () => import('@/views/backstage/index.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/index',
        }
    ]
})

export default router