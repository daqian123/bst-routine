import api from "@/api"
import common from "@/utils/common"
import { setStorage } from "@/utils/storage"
export default {
    state: {
        userAuthorize: false,
        TOKEN: "",
        USER_INFO: '',
        equip_sn: ""
    },
    mutations: {
        setUserAuthorize(state, status) {
            state.userAuthorize = status
        },
        SET_TOKEN(state, token) {
            state.TOKEN = token
            setStorage('token', token)
        },
        SET_USERINFO(state, userInfo) {
            state.USER_INFO = userInfo
            setStorage('userInfo', userInfo)
        },
        scanCodeGetEquip_sn(state, equip_sn) {
            state.equip_sn = equip_sn
        }
    },
    actions: {
        async   userLogin({ commit }, params) {
            await new Promise((reslove, reject) => {
                api.checkLogin(params).then(async res => {
                    commit('SET_TOKEN', res.data.token)
                    reslove()
                }).catch(() => {
                    reject()
                    common.showToast('授权失败')
                })
            })
            await new Promise(reslove => {
                api.getUserInfo().then(res => {
                    reslove()
                    commit('SET_USERINFO', Object.assign({}, res.data, { is_new_user: res.is_new_user }))
                })
            })
        }
    },
    getters: {
        userAuthorize: state => state.userAuthorize,
        TOKEN: state => state.TOKEN,
        USER_INFO: state => state.USER_INFO,
        equip_sn: state => state.equip_sn
    }
}