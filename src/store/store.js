// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './login'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    },
    modules: {
        loginModule
    },
    mutations: {

    }
})

