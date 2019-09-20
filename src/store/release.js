
import api from "@/api/index"
const moduleRelease = {
    state: {
        active: null,
        topStatus: 0,
        topTitleImg: "/static/img/top/topif.png",
        topList: [],
        showWebView: false,
        infoSpreadStatus: false,
        shopSpreadStatus: false
    },
    mutations: {
        //选择置顶类型 信息/商户/续费
        changeTopType(state, status) {
            state.topStatus = status
            let img = "topif";
            if (status == 0) {
                img = "topif";
            } else if (status == 1) {
                img = "topdp";
            } else {
                img = "topxf";
            }
            state.topTitleImg = `/static/img/top/${img}.png`;
        },
        changeTopStatus(state, index) {
            state.topList.forEach((item, val) => {
                item.status = index != val ? false : !item.status;
            });
            state.active = state.topList[index].status ? index : null;
        },
        formatTopStatus(state) {
            state.topList.forEach(item => {
                item.status = false
            });
            state.active = null
        },
        //选择置顶天数
        changeValue(state, value) {
            if (value == 1 && state.topList[3].num > 0) {
                state.topList[3].num--;
            } else if (value == 2) {
                state.topList[3].num++;
            }
            state.topList[3].total = state.topList[3].price * state.topList[3].num
        },
        initializeList(state) {
            state.active = null
            state.topList = [
                { price: 28, total: 28, num: 1, text: "30天", img: "topbg", status: false },
                { price: 158, total: 158, num: 1, text: "半年", img: "topbg", status: false },
                { price: 298, total: 298, num: 1, text: "一年", img: "topbg", status: false },
                { price: 1, total: 0, num: 0, text: "自定义", img: "topbg", status: false }
            ]
        },
        //入驻、发布领取道具记录webView状态
        setPropPage(state, status) {
            state.showWebView = status
        },
        changeTopPrice(state, params) {
            api
                .getRealInfoAmount(params)
                .then(res => {
                    let list = res.info
                    state.topList.forEach((item, index) => {
                        item.price = list[index]
                        if (item.text === '自定义') {
                            item.total = 0
                        } else {
                            item.total = list[index]
                        }
                    })
                    console.log(state.topList)
                });
        },
        //修改发布信息地址时支付差价支付完成后改变地址
        changeInfoSpreadStatus(state) {
            state.infoSpreadStatus = !state.infoSpreadStatus
        },
        //修改入驻地址时支付差价支付完成后改变地址
        changeShopSpreadStatus(state) {
            state.shopSpreadStatus = !state.shopSpreadStatus
        }
    },
    getters: {
        showWebView: state => state.showWebView
    }
}

export default moduleRelease
