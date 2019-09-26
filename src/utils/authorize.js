import { store } from "@/store/store";
import api from "@/api";
import common from "@/utils/common";
export default {
    //检查用户是否授权
    viewAuthorize() {
        common.showLoading("加载中")
        let that = this;
        wx.getSetting({
            success: function (res) {
                //没有授权提示用户进行授权获取用户信息
                if (!res.authSetting["scope.userInfo"]) {
                    store.commit("setLoginStatus", false);
                } else {
                    store.commit("setLoginStatus", true);
                    that.login();
                }
                if (!res.authSetting["scope.userLocation"]) {
                    wx.authorize({
                        scope: "scope.userLocation",
                        success() {
                            store.commit("setLocationStatus", true);
                        },
                        fail() {
                            store.commit("setLocationStatus", false);
                        }
                    });
                } else {
                    store.commit("setLocationStatus", true);
                }
            },
            fail: err => {
                common.showToast("获取位置信息失败，请打开手机设置开启微信位置权限")
                store.commit("setLocationStatus", false)
            }
        });
    },
    //登录
    login(agent_id = "") {
        wx.getUserInfo({
            success: response => {
                wx.login({
                    success: res => {
                        let params = {
                            encryptedData: response.encryptedData, iv: response.iv, code: res.code
                        }
                        if (agent_id) {
                            params.agent_id = agent_id
                        }
                        api.checkLogin(params).then(res => {
                            //获取微信用户信息
                            wx.setStorageSync("user", res.info);
                            store.commit("getUserInfo")
                        })
                    }
                });
            }
        });
    }
}