// 所有的接口都在这里
//引入axios
import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1'
axios.defaults.baseURL = baseURL

//登录验证函数
export const checkUser = params => {
    return axios.post('login', params).then(res => res.data)
}