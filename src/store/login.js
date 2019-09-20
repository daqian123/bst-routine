import { showToast } from "@/utils/pointDialog"
import { store } from "@/store/store"
import api from "@/api/index"
import Vue from 'vue'
const moduleLogin = {
    state: {
        iosSystemStatus: false,//是否是ios系统
        userInfo: "",//用户信息
        locationStatus: false,//位置授权状态
        authorizeModal: false,//位置授权弹框
        loginStatus: false,//登录状态
        msgStatus: false,
        loginModal: false,//登录弹框提示
        agent_id: "",
        sign: ""//签到信息
    },
    mutations: {
        //判断是否是ios系统
        setSystemStatus(state, status) {
            state.iosSystemStatus = status
        },
        //获取转发后agent_id
        setAgentId(state, agent_id) {
            state.agent_id = agent_id
        },
        //修改用户信息
        changUserInfo(state, payLoad) {
            wx.setStorageSync("userInfo", payLoad)
            state.userInfo = payLoad
        },
        //获取用户信息
        getUserInfo(state) {
            api.getInfo().then(res => {
                //获取用户平台信息
                let userInfo = res.info
                userInfo.levelName = res.levelName
                let sign = res.sign
                state.loginStatus = true
                wx.setStorageSync("userInfo", userInfo)
                state.userInfo = userInfo
                state.sign = sign
                //  store.commit("isNewMsg")
            })
        },
        //查看是否有未读消息
        isNewMsg(state) {
            api.isNewMsg().then(res => {
                if (res.info.total != 0) {
                    state.msgStatus = false
                    wx.showTabBarRedDot({ index: 3 });
                } else {
                    state.msgStatus = true
                    wx.hideTabBarRedDot({ index: 3 })
                }
            });
        },
        //设置用户信息
        setUserLoginStatus(state, status) {
            state.loginStatus = status
        },
        //设置登录状态
        setLoginStatus(state, status) {
            state.loginStatus = status
            Vue.prototype.isLogin = () => {
                if (!state.loginStatus) {
                    state.loginModal = true
                    return false
                }
                state.loginModal = false
                return true
            }
        },
        //用户地理位置授权状态
        setLocationStatus(state, status) {
            state.locationStatus = status
            //拒绝授权则使用默认地址
            if (!state.locationStatus) {
                store.commit("getActiveAddress", { data: { code: "340100", city_code: "340100", district: "合肥市", city: "合肥市", lat: 31.79322, lng: 117.30794, address: '合肥市' }, status: 1 })
            } else {
                store.commit("getMyLocationInfo")
            }
            Vue.prototype.getLocationStatus = () => {
                if (!state.locationStatus) {
                    state.authorizeModal = true
                    return false
                }
                state.authorizeModal = false
                return true
            }
        },
        //是否显示登录授权提示
        isShowLoginModal(state, status) {
            state.loginModal = status
        },
        //是否显示授权提示
        isShowModal(state, status) {
            state.authorizeModal = status
        },
        //设置授权状态
        setAuthorize(state, status) {
            state.authorizeModal = !status
            state.locationStatus = status
            status && store.commit("getMyLocationInfo")
        }
    },
    getters: {
        loginModal: state => state.loginModal,
        loginStatus: state => state.loginStatus,
        locationStatus: state => state.locationStatus,
        authorizeModal: state => state.authorizeModal,
        userInfo: state => state.userInfo,
        iosSystemStatus: state => state.iosSystemStatus,
        sign: state => state.sign
    }
}

export default moduleLogin
