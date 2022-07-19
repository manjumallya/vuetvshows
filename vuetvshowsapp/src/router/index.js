import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/tvshow/:id/:tvShowKey',
        name: 'ShowView',
        component: () => import('../views/TvShow.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
