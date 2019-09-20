/**
 * 小程序接口文件
 */

//测试地址域名
//const url = 'https://9.guanyoo.com'
//正式域名
const url = "https://api.zhongxiangjiu.com"

export default {
    //获取用户信息
    getUserInfo() {
        return fetchApi("/applet/user/info", 'post', {})
    },
    //设备的商品详情
    deviceGoodsDetail(params) {
        return fetchApi("/applet/goods/detail", 'post', params)
    },
    //生成订单
    createOrder(params) {
        return fetchApi("/applet/order/submit", 'post', params)
    },
    //订单支付
    getPayOrder(params) {
        return fetchApi("/applet/order/pay", 'post', params)
    },
    //登录
    checkLogin(params) {
        return fetchApi("/applet/login", 'post', params)
    },
    //申请加盟
    join(params) {
        return fetchApi("/applet/apply/store", 'post', params)
    },
    //用户订单
    orderList(params) {
        return fetchApi("/applet/order/list", 'post', params)
    },
    //申请退款order_id telephone reason
    refund(params) {
        return fetchApi("/applet/refund/insert", 'post', params)
    },
    //取消订单id
    cancelOrder(params) {
        return fetchApi("/applet/order/cancel", 'post', params)
    },
    //商品列表
    goodsList(params) {
        return fetchApi('/applet/goods/list', 'post', params)
    },
}
import { getStorage, removeStorage } from "@/utils/storage"
import common from '@/utils/common'
//封装promise
function fetchApi(type, method, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${url}${type}`,
            data: params,
            method: method,
            header: {
                'Authorization': getStorage('token') ? getStorage('token') : ""
            },
            success: res => {
                let code = res.data.code
                if (code == 0) {
                    resolve(res.data)
                } else {
                    let message
                    switch (code) {
                        case 1001:
                            message = '未登录'
                            break;
                        case 1002:
                            message = '授权过期'
                            removeStorage('userInfo')
                            removeStorage('token')
                            break;
                        case 1003:
                            message = '缺失参数'
                            break;
                        default:
                            message = res.data.message
                            break;
                    }
                    common.showToast(message)
                    reject(res.data)
                }
            },
            fail: err => { reject(err) }
        })
    })
};


