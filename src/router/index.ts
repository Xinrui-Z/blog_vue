import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import foreground from "./routes/foreground"
import backstage from './routes/backstage'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/ForeGround.vue'),
            children: [
                ...foreground
            ]
        },
        {
            path: '/backstage',
            component: () => import('@/views/BackStage.vue'),
            children: [
                ...backstage
            ]
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/',
        }
    ]
})

export default router