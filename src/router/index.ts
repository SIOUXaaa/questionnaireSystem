import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/test',
        name: 'test',
        component: () => import('../pages/demo.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
