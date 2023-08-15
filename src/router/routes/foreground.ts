import { createRouter } from "vue-router"

export default [
    {
        name: 'index',
        path: '',
        component: () => import('@/views/foreground/index.vue')
    },
    {
        name: 'articles',
        path: '/articles',
        component: () => import('@/views/foreground/Articles.vue')
    },
    {
        name: 'papers',
        path: '/papers',
        component: () => import('@/views/foreground/Papers.vue')
    },
    {
        name: 'detail',
        path: '/articles/detail',
        component: () => import('@/views/foreground/ArticleDetail.vue')
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('@/views/foreground/About.vue')
    },
    {
        name: 'message',
        path: '/message',
        component: () => import('@/views/foreground/MessageBoard.vue')
    }
]