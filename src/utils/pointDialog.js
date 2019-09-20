

const formartNum = n => {
    n = parseInt(n).toString()
    return n[1] ? n : '0' + n
}
const formatNumber = n => {
    let num = parseInt(n / 60)
    n = n > 0 ? `${formartNum(num)}:${formartNum(n % 60)}` : `00:${formartNum(n)}`
    return n
}
//提示
const showToast = text => wx.showToast({
    title: text,
    icon: "none"
})
// 显示繁忙提示
const showBusy = text => wx.showToast({
    title: text,
    icon: 'none',
    duration: 10000
})
//显示加载中
const showLoading = text => wx.showLoading({
    title: text,
    mask: true,
    success: () => {
        setTimeout(() => {
            wx.hideLoading();
        }, 3000)
    }
})
// 显示成功提示
const showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})
// 弹框提示
const showModal = (fn, content, showCancel = true) => {
    wx.showModal({
        title: "温馨提示",
        content: content,
        showCancel,
        success: res => {
            fn(res)
        }
    })
};
// 下拉弹框
const showActionSheet = (fn, list, color = "#333333") => {
    wx.showActionSheet({
        itemList: list,
        itemColor: color,
        success: res => {
            fn(res)
        }
    })
};
const addSuccess = (fn, text, confirmColor = "#416ce3", cancelColor = "#000") => {
    wx.showModal({
        title: "添加成功！",
        content: text,
        confirmText: "继续添加",
        confirmColor,
        cancelColor,
        cancelText: '完成',
        success: res => {
            fn(res.confirm)
        }
    });
}
function getUrlData(url) {
    let qs = require('qs')
    return qs.parse(url.slice(url.indexOf('?') + 1, url.length))
}
function scanCode() {
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
}

export { formartNum, showBusy, showSuccess, showModal, showToast, showLoading, formatNumber, showActionSheet, addSuccess, scanCode };