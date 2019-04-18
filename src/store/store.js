import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    username: ''
}
const mutations = {
    setUsername: (state, username) => {
        state.username = username
            //将传过来的参数username储存到localstorage中,以免刷新时丢失
        localStorage.setItem('username', username)
    }
}
const actions = {}
const getters = {
    username: (state) => localStorage.getItem('username')
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})