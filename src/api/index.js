// 所有的接口都在这里
//引入axios
import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1'
axios.defaults.baseURL = baseURL


//添加 axios 拦截器（interceptors)
axios.interceptors.request.use(function(config) {
    // 请求成功后返回的内容
    let token = localStorage.getItem('mytoken') //拦截器获取到token 存储到变量token中
    if (token) {
        //config是一个请求参数,他是一个对象,Authorization 是前后台约定好的那key,把获取到的token赋值给他
        config.headers['Authorization'] = token
    }
    return config;
}, function(error) { //请求失败后返回的内容
    return Promise.reject(error);
});


//登录验证函数
export const checkUser = params => {
        return axios.post('login', params).then(res => res.data)
    }
    //获取用户列表
export const getUserList = params => {
        return axios.get('users', params).then(res => res.data)
    }
    //更改用户状态
export const changeUserState = params => {
        return axios.put(`users/${params.uId}/state/${params.type}`).then(res => res.data)
    }
    //添加用户
export const addUsername = params => {
    return axios.post('users', params).then(res => res.data)
}