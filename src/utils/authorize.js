import { store } from "@/store/store";
import common from "@/utils/common"
export default {
    //检查用户是否授权
    viewAuthorize() {
        wx.getSetting({
            success: res => {
                //没有授权提示用户进行授权获取用户信息
                if (!res.authSetting["scope.userInfo"]) {
                    store.commit("setUserAuthorize", false);
                } else {
                    this.getUserInfo();
                }
            }
        });
    },
    async getUserInfo() {
        store.commit("setUserAuthorize", true);
        common.showLoading('登录中')
        let code = await new Promise(reslove => {
            wx.login({
                success: response => {
                    reslove(response.code)
                }
            });
        })
        let params = await new Promise(reslove => {
            wx.getUserInfo({
                success: res => {
                    let params = { encryptedData: res.encryptedData, iv: res.iv, code }
                    reslove(params)
                }
            });
        })
        await store.dispatch('userLogin', params).then(() => {
            wx.hideLoading();
        })
    }
}