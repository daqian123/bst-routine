/*注册全局方法*/
import { store } from "@/store/store"
import api from "@/api";
const common = {
    //未登录隐藏转发按钮
    isShowShare() {
        !store.state.moduleLogin.loginStatus ? wx.hideShareMenu() : wx.showShareMenu();
    },
    setTime(time = 1000) {
        return new Promise(reslove => {
            setTimeout(() => {
                reslove()
            }, time)
        })
    },
    formartNum(n) {
        n = parseInt(n).toString()
        return n[1] ? n : '0' + n
    },
    //提示
    showToast(text) {
        wx.showToast({
            title: text,
            icon: "none"
        })
    },
    // 显示繁忙提示
    showBusy(text) {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 10000
        })
    },
    //显示加载中
    showLoading(text) {
        wx.showLoading({
            title: text,
            mask: true,
            success: () => {
                setTimeout(() => {
                    wx.hideLoading();
                }, 3000)
            }
        })
    },
    // 显示成功提示
    showSuccess(text) {
        wx.showToast({
            title: text,
            icon: 'success'
        })
    },
    // 弹框提示
    showModal(content, showCancel = true) {
        return new Promise(reslove => {
            wx.showModal({
                title: "温馨提示",
                content: content,
                showCancel,
                success: res => {
                    reslove(res.confirm)
                }
            })
        })
    },
    // 下拉弹框
    showActionSheet(list, color = "#333") {
        return new Promise(reslove => {
            wx.showActionSheet({
                itemList: list,
                itemColor: color,
                success: res => {
                    reslove(res)
                }
            })
        })
    },
    addSuccess(text, confirmColor = "#416ce3", cancelColor = "#000") {
        return new Promise(resolve => {
            wx.showModal({
                title: "添加成功！",
                content: text,
                confirmText: "继续添加",
                confirmColor,
                cancelColor,
                cancelText: '完成',
                success: res => {
                    resolve(res.confirm)
                }
            });
        })

    },
    getUrlData(url) {
        let qs = require('qs')
        return qs.parse(url.slice(url.indexOf('?') + 1, url.length))
    },
    scanCode() {
        wx.scanCode({
            success(res) {
                console.log(res)
                let path
                if (res.result) {
                    let url = res.result
                    let data = getUrlData(url)
                    if (url.includes('ShopScan')) {
                        let { id, scanning } = data
                        path = `/pages/shopPackage/pages/receipt/main?data=${JSON.stringify({ order_id: id, scanning })}`
                    }
                    if (url.includes('PlaceOrder')) {
                        let { id, table_id } = data
                        path = `/pages/shop/shoppingCart/main?data=${JSON.stringify({ shop_id: id, table_id, customer: 1 })}`
                    }
                    if (url.includes('DeskDetails')) {
                        let { id, customer } = data
                        path = `/pages/shop/createMenuOrder/main?param=${JSON.stringify({ cart_id: id, status: customer })}`
                    }
                } else {
                    path = `/${res.path}`
                }
                wx.navigateTo({
                    url: path,
                    fail: err => {
                        showToast("识别失败");
                    }
                });
            }
        });
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
    sendAgentId(options = "") {
        if (options) {
            let param;
            try {
                param = JSON.parse(options.param)
            } catch (error) {
                param = { agent_id: "" }
            }
            param.agent_id &&
                (store.state.moduleLogin.loginStatus
                    ? api.getAgentid({ agent_id: param.agent_id }).then(res => {
                        console.log(res)
                    })
                    : store.commit("setAgentId", param.agent_id))
            console.log(param)
            return param;
        }
        return {}
    },
    setNavigationBar(text, frontColor = "#000", backgroundColor = "#fff") {
        frontColor = frontColor.split('#')[1].length === 3 ? `#${frontColor.split('#')[1].repeat(2)}` : frontColor
        backgroundColor = backgroundColor.split('#')[1].length === 3 ? `#${backgroundColor.split('#')[1].repeat(2)}` : backgroundColor
        wx.setNavigationBarTitle({
            title: text
        });
        wx.setNavigationBarColor({
            frontColor,
            backgroundColor
        });
    },
    //以iphone6为标准获取其他屏幕的大小
    getListInfo(height, width = 375) {
        return new Promise(reslove => {
            wx.getSystemInfo({
                success: res => {
                    console.log(res)
                    let ww = res.windowWidth;
                    let hh = res.windowHeight;
                    let sw = res.screenWidth
                    let sh = res.screenHeight
                    reslove({ height: parseInt(ww / 375 * height), width: width ? parseInt(ww / 375 * width) : 375, ww, hh, sw, sh })
                }
            });
        })
    },
    //获取手机信息
    getSystemInfo() {
        return new Promise(reslove => {
            wx.getSystemInfo({
                success: res => {
                    res.isIOS = res.platform == "ios" ? false : true
                    res.isWX7 = res.version[0] > 6 ? true : false
                    reslove(res)
                }
            });
        })
    },
    getImgInfo(src) {
        return new Promise(resolve => {
            wx.getImageInfo({
                src,
                success: resolve
            });
        });
    },
    setMobile(mobile) {
        let re = new RegExp(/^1[3456789]\d{9}$/);
        if (re.test(mobile)) {
            return { hideMobile: `${mobile.toString().substring(0, 3)}****${mobile.toString().substring(7, 11)}`, mobile }
        }
        return { mobile, hideMobile: mobile }
    },
    setScrollVal(el, height) {
        const query = wx.createSelectorQuery();
        query.select(el).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => {
            common.getListInfo(height).then(res2 => {
                let scrollValue = res[1].scrollTop + res[0].top - res2.height
                wx.pageScrollTo({ scrollTop: scrollValue, duration: 0 });
            });
        });
    },
    getStampDate(date) {       //时间戳
        let time = date * 1000
        return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()}`;
    },
    getSecondsDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    getDayDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    getMinutesDate(time) {
        time = time * 1000
        let date = new Date(time)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${common.formartNum(date.getHours())}:${common.formartNum(date.getMinutes())}`
    }
}
export default common