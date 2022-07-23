import { createRouter, createWebHistory } from 'vue-router';
import home from './home'
import signin from './signin';
const routes = [
    ...home,
    ...signin
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;