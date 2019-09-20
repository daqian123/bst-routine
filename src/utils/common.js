/*注册全局方法*/
import { store } from "@/store/store"
import {
    showModal
} from "@/utils/pointDialog"
import api from "../api";
export default {
    //未登录隐藏转发按钮
    isShowShare() {
        !store.state.moduleLogin.loginStatus ? wx.hideShareMenu() : wx.showShareMenu();
    },
    //设置agent_id参数
    setShareInfo(title, path, params = {}, img = "") {
        params = typeof params == "string" ? JSON.parse(params) : params;
        params.agent_id = wx.getStorageSync("user").agent_id;
        let obj = {
            title,
            path: `/pages${path}/main?param=${JSON.stringify(params)}`
        };
        if (img) obj.imageUrl = img;
        return obj;
    },
    //显示loading内容
    showLoading(text) {
        wx.showLoading({
            title: text,
            mask: true,
            success: () => {
                setTimeout(() => {
                    wx.hideLoading();
                }, 5000);
            }
        })
    },
    //隐藏loading
    hideLoading() {
        setTimeout(() => {
            wx.hideLoading();
        }, 500);
    },
    setNavigationBar(text, frontColor = "#000000", backgroundColor = "#ffffff") {
        wx.setNavigationBarTitle({
            title: text
        });
        wx.setNavigationBarColor({
            frontColor,
            backgroundColor
        });
    },
    setMobile(mobile) {
        let re = new RegExp(/^1[3456789]\d{9}$/);
        if (re.test(mobile)) {
            return { hideMobile: `${mobile.toString().substring(0, 3)}****${mobile.toString().substring(7, 11)}`, mobile }
        }
        return { mobile, hideMobile: mobile }
    },
    getListInfo(fn, height, width = 375) {
        wx.getSystemInfo({
            success: res => {
                let ww = res.windowWidth;
                let hh = res.windowHeight;
                let sw = res.screenWidth
                let sh = res.screenHeight
                fn({ height: parseInt(ww / 375 * height), width: width ? parseInt(ww / 375 * width) : 375, ww, hh, sw, sh })
            }
        });
    },
    isApprove(params = {}) {
        let url;
        let shop_id = wx.getStorageSync("userInfo").shop_id;
        api.getVerify({ shop_id }).then(res => {
            let is_verify = parseInt(res.info.status)
            let is_food_cate = res.info.is_food_cate
            switch (is_verify) {
                case 0:
                    url = `/pages/shopPackage/pages/approveInfo/main?shop_id=${shop_id}`;
                    wx.navigateTo({ url });
                    break;
                case 1:
                    url =
                        "/pages/shopPackage/pages/addCommodity/main?data=" + JSON.stringify(params);
                    wx.navigateTo({ url });
                    break;
                case 2:
                    showModal(res => {
                        if (res.confirm) {
                            wx.redirectTo({ url: "/pages/shopPackage/pages/addApprove/main?param=" + JSON.stringify({ status: 2, is_food_cate }) });
                        }
                    }, "您的商户未通过认证，请重新认证后再尝试", false)
                    break;
                case 3:
                    showModal(res => {
                        if (res.confirm) {
                            wx.redirectTo({ url: "/pages/shopPackage/pages/addApprove/main?param=" + JSON.stringify({ status: 0, is_food_cate }) });
                        }
                    }, "您的商户未认证，请先认证后再尝试", false)
                    break;
            }
        })
    }
}
// 基础版的防抖函数
let timeout;
function debounce(func, wait) {
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}
// 基础版的节流函数
let timeout2 = null;
function throttle(func, wait) {
    return function () {
        if (!timeout2) {
            timeout2 = setTimeout(function () {
                clearTimeout(timeout2);
                timeout2 = null;
                func();
            }, wait);
        }
    };
}
export { debounce, throttle }