import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '../views/user/user'
import Right from '../views/rights/Right'
import Role from '../views/rights/Role'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: { path: 'welcome' }, //路由重定向，登录后直接进入welcome组件页面
            children: [ //home路由 的子路由 使用children
                {
                    path: 'welcome',
                    name: 'Welcome',
                    component: Welcome
                },
                {
                    name: 'User',
                    path: 'user',
                    component: User
                },
                {
                    name: 'Right',
                    path: 'right',
                    component: Right
                },
                {
                    name: 'Role',
                    path: 'role',
                    component: Role
                }
            ]
        }
    ]
})