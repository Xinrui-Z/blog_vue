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
                            component:() => import('@/views/backstage/UserCenter.vue')
                        },
                        {
                            name: 'blogmanage',
                            path: 'manage',
                            component:() => import('@/views/backstage/BlogManage.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/',
        }
    ]
})

export default router