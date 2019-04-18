// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//引入index.js 文件
import './styles/index.scss'
//注册插件
Vue.use(ElementUI)

Vue.config.productionTip = false

// 注册一个全局守卫（导航卫士）,其作用就是在路由跳转之前，对路由进行判断，防止未登录的用户跳转到需要登录的页面
router.beforeEach((to, from, next) => {
        let token = localStorage.getItem('mytoken') //获取用户登录时生成的token
        if (token) {
            next(); //如果token存在，说明用户已经登录，调用next方法，不妨碍用户继续浏览
        } else {
            if (to.path !== '/login') { //如果用户没有登录浏览别的页面，则强制跳转到登录页面
                next({ path: '/login' })
            } else { //如果用户浏览的就是登录页面，则调用next方法 ，不去干涉，
                next()
            }
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})