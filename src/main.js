import Vue from 'vue'
import App from './App'
import '../static/icon/iconfont.css'
import '../static/css/public.css'
import '../static/css/common.css'
import { store } from './store/store'
import common from "@/utils/common"
import api, { getRegeo, getLocation, upyun } from './api'


Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$getRegeo = getRegeo
Vue.prototype.$getLocation = getLocation
Vue.prototype.$upyun = upyun
for (const key in common) {
    Vue.prototype[`$${key}`] = common[key]
}
App.mpType = 'app'
const app = new Vue(App)
app.$mount()

