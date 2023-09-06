import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', redirect:{name: 'Demo'}
    },
    {
        path: '/demo',
        name: 'Demo',
        component: () => import('../pages/demo.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
