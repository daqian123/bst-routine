
export default {
    setTime(callback, time = 1000) {
        setTimeout(() => {
            callback()
        }, time)
    },
    //个位转两位数
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
    //显示加载中
    showLoading(text) {
        wx.showLoading({
            title: text,
            mask: true
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
    showModal(fn, content, showCancel = true) {
        wx.showModal({
            title: "温馨提示",
            content: content,
            showCancel,
            success: res => {
                fn(res)
            }
        })
    },
    // 下拉弹框
    showActionSheet(fn, list, color = "#333333") {
        wx.showActionSheet({
            itemList: list,
            itemColor: color,
            success: res => {
                fn(res)
            }
        })
    },
    //设置导航栏标题颜色
    setNavigationBar(text, frontColor = "#000000", backgroundColor = "#ffffff") {
        wx.setNavigationBarTitle({
            title: text
        });
        wx.setNavigationBarColor({
            frontColor,
            backgroundColor
        });
    },
    //隐藏中间四位号码
    setMobile(mobile) {
        let re = new RegExp(/^1[3456789]\d{9}$/);
        if (re.test(mobile)) {
            return { hideMobile: `${mobile.toString().substring(0, 3)}****${mobile.toString().substring(7, 11)}`, mobile }
        }
        return { mobile, hideMobile: mobile }
    },
    //以iphone6为标准获取其他屏幕的大小
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
    //获取手机信息
    getSystemInfo(cbok) {
        wx.getSystemInfo({
            success: res => {
                res.isIOS = res.platform == "ios" ? false : true
                res.isWX7 = res.version[0] > 6 ? true : false
                cbok(res)
            }
        });
    },
    scanCode() {
        wx.scanCode({
            success(res) {
                console.log(res)
                let path
                if (res.result) {
                    let url = res.result
                    let data = getUrlData(url)
                    if (url.includes('shareGoodsDetail')) {
                        let { equip_sn } = data
                        path = `/pages/index/shareGoodsDetail/main?equip_sn=${equip_sn}`
                    }
                } else {
                    path = `/${res.path} `
                }
                wx.navigateTo({
                    url: path,
                    fail: () => {
                        wx.showToast({
                            title: '识别失败',
                            icon: "none"
                        });
                    }
                });
            },
            fail: () => {
                wx.showToast({
                    title: '识别失败',
                    icon: "none"
                });
            }
        });
    }
}
function getUrlData(url) {
    let qs = require('qs')
    return qs.parse(url.slice(url.indexOf('?') + 1, url.length))
}