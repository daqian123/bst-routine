import Vue from 'vue'
import App from './App'
import '../static/icon/iconfont.css'
import '../static/css/public.css'
import '../static/css/common.css'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
