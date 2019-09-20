import api from "@/api"
import { store } from "./store"
import Vue from "vue"
import { showModal, showSuccess, showToast } from "@/utils/pointDialog";
const moduleShopManagement = {
    state: {
        totalCoupon: 0,//优惠券总数
        couponList: [],//优惠券列表
        orderList_sm: [],//订单列表
        orderParams_sm: { page: 1, status: 1 },
        orderNoneData_sm: false,
        orderLoading_sm: false,
        orderNoneMore_sm: false,
        activityList: [],//活动列表
        totalActivity: 0,//活动总数
        logisticsDialog: false,
        couponLoadingModal: false,//优惠券加载前样式
        activityLoadingModal: false,
        commodityLoadingModal: false,
        templateList: [],
        templateLoadingModal: false,
        commodityCateList: [],//商品分类
        cateIndex: 0,//分类下标
        smsPayStatus: false,//短信群发支付成功状态
        smsContent: "",
        snatchAudio: "",//抢购背景音乐
        audioManagement: "",
        tableOrderList: [],//台桌订单
        tableOrderParams: { page: 1, type: 1, shop_id: "" },
        tableOrderNoneData: false,
        tableOrderLoading: false,
        tableOrderNoneMore: false,
        moneyTimer: ""
    },
    mutations: {
        cleanMoneyTimer(state) {
            clearTimeout(state.moneyTimer)
        },
        selectTableOrder(state, type) {
            let shop_id = wx.getStorageSync("userInfo").shop_id
            state.tableOrderList = []
            state.tableOrderParams = {
                page: 1, type, shop_id
            }
            store.commit("tableOrderList")
        },
        tableOrderList(state) {
            state.tableOrderLoading = true;
            state.tableOrderNoneData = false;
            state.tableOrderNoneMore = false;
            api.tableOrderList(state.tableOrderParams).then(res => {
                state.tableOrderLoading = false;
                let list = res.info;
                if (list.length == 0 && state.tableOrderList.length == 0) {
                    state.tableOrderNoneData = true;
                } else if (list.length > 0) {
                    state.tableOrderParams.page++;
                    state.tableOrderList = state.tableOrderList.concat(list);
                } else {
                    state.tableOrderNoneMore = true;
                }
            })
        },
        createAudio(state) {
            state.audioManagement = wx.createInnerAudioContext()
        },
        //设置短信支付成功状态
        setSmsPayStatus(state, status) {
            state.smsPayStatus = status
        },
        //设置短信内容
        setSmsStatus(state, content) {
            state.smsContent = content
        },
        //搜索商品
        searchCommodity(state, value) {
            let searchList = state.commodityCateList[state.cateIndex].list.filter(item => {
                return item.name.includes(value)
            })
            store.state.moduleMove.moveList = searchList
        },
        //添加商品分类
        addCommodityCate(state, data) {
            state.commodityCateList.push(data)
        },
        //切换分类
        changeMyCommodityCate(state, index) {
            state.cateIndex = index
            let list = state.commodityCateList[index].list
            store.commit("getCommodityList", list)
        },
        //初始化我的商品
        formatMyCommodity(state) {
            state.commodityLoadingModal = false
            store.commit("getMyShopGoods")
        },
        //获取我的商品列表
        getMyShopGoods(state) {
            let shop_id = store.state.moduleLogin.userInfo.shop_id
            api.getGoodsByCate({ shop_id, is_backend: 1 }).then(res => {
                state.commodityLoadingModal = true
                state.commodityCateList = res.info
                let list = state.commodityCateList[state.cateIndex].list
                store.commit("getCommodityList", list)
            });
        },
        //获取当前分类商品列表
        getCommodityList(state, list) {
            list.forEach(item => {
                item.isTouchMove = false
                item.manageStatus = true;
            });
            store.commit("setMoveList", list);
        },
        //选择要删除的商品
        selectDeleteCommodity(state, index) {
            let list = store.state.moduleMove.moveList
            list[index].manageStatus = !list[index].manageStatus
            Vue.set(list, index, list[index])
        },
        //选择要全部删除的商品
        selectAllDeleteCommodity(state, selectAll) {
            let list = store.state.moduleMove.moveList
            list.forEach(item => { item.manageStatus = !selectAll ? false : true })
        },
        //删除我的商品
        deleteMyCommodity(state) {
            let list = store.state.moduleMove.moveList
            let id = [];
            list.forEach(item => {
                if (!item.manageStatus) {
                    id.push(item.id);
                }
            });
            if (id.length == 0) {
                showToast("请选择商品");
                return;
            }
            showModal(res => {
                if (res.confirm) {
                    api.deleteCommodity({ id: id.join() }).then(res => {
                        showSuccess("已删除");
                        store.commit("getMyShopGoods")
                    });
                }
            }, "确认删除吗");
        },
        //添加抢购背景音乐
        addSnatchMusic(state, data) {
            state.snatchAudio = data
            wx.navigateBack({ delta: 1 })
        },
        formatMusic(state) {
            state.snatchAudio = ""
        },
        //获取运费模板列表
        getTemplateList(state, shop_id) {
            state.templateLoadingModal = false
            api.templateList({ shop_id }).then(res => {
                state.templateLoadingModal = true
                let list = res.info.list
                state.templateList = list
            })
        },
        //添加模板
        addTemplate(state, data) {
            state.templateList.unshift(data)
        },
        //编辑模板
        editTemplate(state, data) {
            state.templateList = [data]
        },
        //获取优惠券列表
        getCouponList(state) {
            state.couponLoadingModal = false
            api.shopCouponsManagement().then(res => {
                state.couponLoadingModal = true
                state.totalCoupon = res.count
                res.info.forEach(item => {
                    item.manageStatus = true;
                });
                state.couponList = res.info;
            });
        },
        //添加优惠券
        addCoupons(state, data) {
            data.title = data.amount ? `满${data.amount}元可用` : "全场可用"
            data.last_num = data.total
            data.discount = Number(data.discount).toFixed(2)
            data.amount = Number(data.amount).toFixed(2)
            state.totalCoupon++
            state.couponList.unshift(data)
        },
        //删除优惠券
        deleteCoupon(state) {
            let shop_id = store.state.moduleLogin.userInfo.shop_id
            let c_ids = [];
            state.couponList.forEach(item => {
                if (!item.manageStatus) {
                    c_ids.push(item.id);
                }
            });
            if (c_ids.length == 0) {
                showToast("请选择优惠券");
                return;
            }
            showModal(res => {
                if (res.confirm) {
                    api.deleteShopCoupons({ c_ids, shop_id }).then(res => {
                        showSuccess("已删除");
                        state.totalCoupon = state.totalCoupon - c_ids.length
                        state.couponList = state.couponList.filter(item => {
                            return item.manageStatus;
                        });
                    });
                }
            }, "确认删除吗");
        },
        //我的活动
        shopActivityList(state) {
            state.activityLoadingModal = false
            api.shopActivityList().then(res => {
                state.activityLoadingModal = true
                state.totalActivity = res.count
                res.info.forEach(item => {
                    item.manageStatus = true;
                });
                state.activityList = res.info;
            });
        },
        deleteActivity(state) {
            let shop_id = store.state.moduleLogin.userInfo.shop_id
            let a_ids = [];
            state.activityList.forEach(item => {
                if (!item.manageStatus) {
                    a_ids.push(item.id);
                }
            });
            if (a_ids.length == 0) {
                showToast("请选择活动");
                return;
            }
            showModal(res => {
                if (res.confirm) {
                    api.deleteActivity({ a_ids, shop_id }).then(res => {
                        showSuccess("已删除");
                        state.totalActivity = state.totalActivity - a_ids.length
                        state.activityList = state.activityList.filter(item => {
                            return item.manageStatus;
                        });
                    });
                }
            }, "确认删除吗");
        },
        //添加活动
        addActivity(state, data) {
            data.manageStatus = true;
            state.totalActivity++
            state.activityList.unshift(data)
        },
        //编辑活动
        editActivity(state, data) {
            let list = state.activityList
            let index = list.findIndex(item => {
                return item.id == data.id
            })
            list[index] = data
        },
        //商户订单
        shopOrderStatus(state, status) {
            state.orderList_sm = [];
            state.orderParams_sm = {
                status,
                page: 1
            };
            store.commit("getShopOrderList", state.orderParams_sm)
        },
        getShopOrderList(state, params) {
            state.orderNoneData_sm = false;
            state.orderLoading_sm = true;
            state.orderNoneMore_sm = false;
            api.shopOrderList(params).then(res => {
                state.orderLoading_sm = false;
                let list = res.info
                if (list.length == 0 && state.orderList_sm.length == 0) {
                    state.orderNoneData_sm = true;
                } else if (list.length > 0) {
                    state.orderParams_sm.page++;
                    state.orderList_sm = state.orderList_sm.concat(list);
                } else {
                    state.orderNoneMore_sm = true;
                }
            });


        },
        //更新订单状态 1 取消订单  2 删除订单  3 确认收货  4 申请退款 5确认退款 6  拒绝退款
        updateShopOrderStatus(state, data) {
            let { type, item } = data
            let order_id = item.order_id
            let index = state.orderList_sm.findIndex(item => {
                return item.id == item.id
            })
            let params = { type, order_id }
            if (type == 4) params.cancel_reason = item.reason
            switch (type) {
                case 1:
                    showModal(res => {
                        if (res.confirm) {
                            api.updateOrderStatus(params).then(res => {
                                showSuccess("已取消");
                                state.orderNoneMore_sm = false;
                                state.orderList_sm.splice(index, 1)
                            })
                        }
                    }, "确认取消订单吗");
                    break;
                case 2:
                    showModal(res => {
                        if (res.confirm) {
                            api.updateOrderStatus(params).then(res => {
                                showSuccess("已删除")
                                state.orderNoneMore_sm = false;
                                state.orderList_sm.splice(index, 1)
                            })
                        }
                    }, "确定删除订单吗");

                    break;
                case 3:
                    let text = '确认发货吗'
                    showModal(res => {
                        if (res.confirm) {
                            api.updateOrderStatus(params).then(res => {
                                showSuccess('已发货')
                                state.orderNoneMore_sm = false;
                                state.orderList_sm.splice(index, 1)
                            })
                        }
                    }, text);
                    break;
                case 4:
                    api.updateOrderStatus(params).then(res => {
                        showSuccess("提交成功")
                        state.orderNoneMore_sm = false;
                        state.orderList_sm.splice(index, 1)
                        setTimeout(() => {
                            wx.navigateTo({ url: "../requestRefund/main?amount=" + item.amount })
                        }, 500)
                    })
                    break;
                case 5:
                    showModal(res => {
                        if (res.confirm) {
                            api.updateOrderStatus(params).then(res => {
                                showSuccess("已完成退款")
                                state.orderNoneMore_sm = false;
                                Vue.set(state.orderList_sm[index], 'status', 5)
                            })
                        }
                    }, `确认退还${item.amount}元给该用户吗？`);
                    break;
                case 6:
                    showModal(res => {
                        if (res.confirm) {
                            api.updateOrderStatus(params).then(res => {
                                showSuccess("已完成")
                                state.orderNoneMore_sm = false;
                                Vue.set(state.orderList_sm[index], 'status', 6)
                            })
                        }
                    }, `确认拒绝退款吗？`);
                    break;
                case 7:
                    showModal(res => {
                        if (res.confirm) {
                            let param = { order_id }
                            if (data.formData) {
                                let { express_company, express_sn } = data.formData
                                param.express_company = express_company
                                param.express_sn = express_sn
                            } else {
                                param.scanning = 1
                            }
                            api.delivery(param).then(res => {
                                showSuccess("已确认发货")
                                state.logisticsDialog = false
                                state.orderList_sm.splice(index, 1)
                                setTimeout(() => {
                                    wx.redirectTo({ url: "../orderList/main?index=3" });
                                }, 1000)
                            })
                        }
                    }, "确认发货吗？");
                    break;
            }

        },
        setLogisticsDialog(state, status) {
            state.logisticsDialog = status
        }
    },
    getters: {
        orderNoneData_sm: state => state.orderNoneData_sm,
        orderLoading_sm: state => state.orderLoading_sm,
        orderNoneMore_sm: state => state.orderNoneMore_sm,
        orderList_sm: state => state.orderList_sm,
        orderParams_sm: state => state.orderParams_sm,
        couponList: state => state.couponList,
        totalCoupon: state => state.totalCoupon,
        activityList: state => state.activityList,
        totalActivity: state => state.totalActivity,
        logisticsDialog: state => state.logisticsDialog,
        couponLoadingModal: state => state.couponLoadingModal,
        activityLoadingModal: state => state.activityLoadingModal,
        commodityLoadingModal: state => state.commodityLoadingModal,
        templateList: state => state.templateList,
        templateLoadingModal: state => state.templateLoadingModal,
        cateIndex: state => state.cateIndex,
        commodityCateList: state => state.commodityCateList,
        snatchAudio: state => state.snatchAudio,
        audioManagement: state => state.audioManagement,
        tableOrderList: state => state.tableOrderList,
        tableOrderParams: state => state.tableOrderParams,
        tableOrderNoneData: state => state.tableOrderNoneData,
        tableOrderLoading: state => state.tableOrderLoading,
        tableOrderNoneMore: state => state.tableOrderNoneMore,
        moneyTimer: state => state.moneyTimer
    }
}
export default moduleShopManagement