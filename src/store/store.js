// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import moduleIndex from './index'
import moduleLogin from './login'
import moduleRelease from './release'
import moduleMove from './move'
import moduleFollow from "./follow"
import moduleHitchhiking from "./hitchhiking"
import moduleComment from "./comment"
import moduleShop from "./shop"
import moduleShopManagement from "./shopManagement"
import moduleProps from "./props"
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    },
    modules: {
        moduleIndex,
        moduleLogin,
        moduleRelease,
        moduleMove,
        moduleFollow,
        moduleHitchhiking,
        moduleComment,
        moduleShop,
        moduleShopManagement,
        moduleProps
    },
    mutations: {

    }
})

