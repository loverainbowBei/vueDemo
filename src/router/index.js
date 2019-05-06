import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '../views/user/user'
import Right from '../views/rights/Right'
import Role from '../views/rights/Role'
import Categories from '../views/categories/Categories'
import Goods from '@/views/goods/Goods'
import addGoods from '../views/goods/addGoods'

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
                    name: 'Users',
                    path: 'users',
                    component: User
                },
                {
                    name: 'Rights',
                    path: 'rights',
                    component: Right
                },
                {
                    name: 'Roles',
                    path: 'roles',
                    component: Role
                },
                {
                    name: 'Categories',
                    path: 'categories',
                    component: Categories
                },
                {
                    name: 'Goods',
                    path: 'goods',
                    component: Goods
                },
                {
                    name: 'addGoods',
                    path: 'toadd', //这里的路径必须和后台给的的路径一致
                    component: addGoods
                }
            ]
        }
    ]
})