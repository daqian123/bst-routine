import api from "@/api"
import { store } from "./store"
import common from "@/utils/common";
const moduleShop = {
    state: {
        activeAddress: "",//收货地址
        commodityTotalPrice: 0,//选中商品总价
        commodityTotal: 0,//选中商品总数目
        commodityList: [],
        cateValue: 0,//商户主页分类下标
        commodityCate: [],//商户主页商品分类
        snatchList: [],//商户主页抢购列表
        cateId: '',
        commodityNoneData: false,//商户主页暂无商品
        menuValue: 0,
        menuId: "",
        menuTotalPrice: 0,
        menuTotal: 0,
        menuNoneData: false,//点餐暂无商品
        shopMenuList: [],//点餐商品列表
        table_number: "",
        table_id: "",
        orderStatusInfo: "",//订单状态信息
        license: ""//商户认证信息
    },
    mutations: {
        //确认支付页面
        confirmPayMenuCommodity(state, shop_id) {
            if (state.menuTotal < 1) {
                common.showToast("请选择商品");
                return;
            }
            let list = []
            state.shopMenuList.forEach(item => {
                list = list.concat(item.list)
            })
            let commodityList = list.filter(item => {
                return item.num > 0;
            })
            let data = {
                total: state.menuTotal,
                totalPrice: state.menuTotalPrice,
                commodityList,
                shop_id,
                table_number: state.table_number,
                table_id: state.table_id
            };
            let url = "../tableConfirmOrder/main?data=" + JSON.stringify(data);
            wx.redirectTo({ url });
        },
        //添加购买商品
        addMenuCommodityNum(state, item) {
            item.num++;
            let price = item.is_active == 1 ? item.activity_price : item.price
            item.childPrice = item.num * Number(price);
            store.commit("countMenCommodityNum")
        },
        //减少商品
        groupMenuCommodityNum(state, item) {
            if (item.num < 1) {
                common.showToast("请添加商品");
                return;
            }
            item.num--;
            let price = item.is_active == 1 ? item.activity_price : item.price
            item.childPrice = item.num * Number(price);
            store.commit("countMenCommodityNum")
        },
        countMenCommodityNum(state) {
            let total = 0;
            let price = 0;
            state.shopMenuList.forEach(item => {
                item.list.forEach(item => {
                    total += item.num;
                    price += item.childPrice;
                })
            })
            state.menuTotal = total;
            state.menuTotalPrice = Number(price).toFixed(2);
        },
        //切换商品主页分类
        changeMenuCommodityCate(state, index) {
            state.menuId = 'id' + state.shopMenuList[index].id
            state.menuValue = index
        },
        //点餐商品详情
        menuCommodityInfo(state, data) {
            let { index, id } = data
            state.menuValue = index
            wx.navigateTo({
                url: "../commodityInfo/main?param=" + JSON.stringify({ id })
            });
        },
        changeMenuId(state) {
            state.menuId = ""
        },
        changeMenuValue(state, index) {
            state.menuValue = index
        },
        addVegetables(state, data) {
            let { goods, table_id } = data
            state.table_id = table_id
            state.menuNoneData = false
            api.shopMenuList({ table_id }).then(res => {
                if (res.message == "暂无商品") state.menuNoneData = true
                let list = res.info.list
                state.table_number = res.info.table_name
                try {
                    state.menuId = 'id' + list[0].id
                } catch (error) {
                    state.menuId = 'id0'
                }
                list.forEach(item => {
                    item.menuId = 'id' + item.id
                    item.list.forEach(item1 => {
                        item1.num = 0;
                        item1.childPrice = 0;
                        goods.forEach(item2 => {
                            if (item2.good_id == item1.id) {
                                item1.num = parseInt(item2.number)
                                let price = item1.is_active == 1 ? item1.activity_price : item1.price
                                item1.childPrice = parseInt(item1.num) * price
                            }
                        })
                        if (item1.images.length != 0) {
                            item1.images = item1.images[0]
                        } else {
                            item1.images = ""
                        }
                    })
                })
                state.shopMenuList = list
                let total = 0;
                let price = 0;
                state.shopMenuList.forEach(item => {
                    item.list.forEach(item => {
                        total += item.num;
                        price += item.childPrice;
                    })
                })
                state.menuTotal = total;
                state.menuTotalPrice = Number(price).toFixed(2);
            });
        },
        //获取商户点餐列表
        getShopMenuList(state, table_id) {
            state.menuTotalPrice = 0
            state.menuTotal = 0
            state.table_id = table_id
            state.menuNoneData = false
            api.shopMenuList({ table_id }).then(res => {
                state.license = res.info.license
                if (res.message == "暂无商品") state.menuNoneData = true
                let list = res.info.list
                state.table_number = res.info.table_name
                try {
                    state.menuId = 'id' + list[0].id
                } catch (error) {
                    state.menuId = 'id0'
                }
                list.forEach(item => {
                    item.menuId = 'id' + item.id
                    item.list.forEach((item, index) => {
                        item.num = 0;
                        item.childPrice = 0;
                        if (item.images.length != 0) {
                            item.images = item.images[0]
                        } else {
                            item.images = ""
                        }
                    })
                })
                state.shopMenuList = list
            });
        },
        //转发或者单独购买商品时初始价格和商品数量
        formatCommodityPirce(state) {
            state.commodityTotalPrice = 0
            state.commodityTotal = 0
        },
        //初始化商店商品列表
        formatCommodity(state, shop_id) {
            state.commodityTotalPrice = 0
            state.commodityTotal = 0
            state.commodityCate = [];
            state.cateValue = 0
            store.commit("getShopGoods", shop_id)
        },
        //获取商户商品
        getShopGoods(state, shop_id) {
            state.commodityNoneData = false
            api.getGoodsByCate({ shop_id, is_backend: 2 }).then(res => {
                let list = res.info
                try {
                    state.cateId = 'id' + list[0].id
                } catch (error) {
                    state.cateId = 'id0'
                }
                let length = 0
                list.forEach(item => {
                    item.cateId = 'id' + item.id
                    length += item.list.length
                    item.list.forEach((item, index) => {
                        item.num = 0;
                        item.childPrice = 0;
                        if (item.images.length != 0) {
                            item.images = item.images[0]
                        } else {
                            item.images = ""
                        }
                    })
                })
                state.commodityNoneData = length == 0 ? true : false
                state.commodityCate = list
            });
        },
        //切换商品主页分类
        changeCommodityCate(state, index) {
            console.log(index)
            state.cateId = 'id' + state.commodityCate[index].id
            state.cateValue = index
        },
        changeCateValue(state, index) {
            state.cateValue = index
        },
        changeCateId(state) {
            state.cateId = ""
        },
        //商品详情
        toCommodityInfo(state, data) {
            console.log(data)
            let { index, id } = data
            state.cateValue = index
            wx.navigateTo({
                url:
                    "/pages/mallPackage/pages/commodityInfo/main?param=" +
                    JSON.stringify({ id: id, status: 1 })
            });
        },
        confirmPaySnatch(state, shopInfo) {
            let commodityList = [{
                images: shopInfo.images.length != 0 ? shopInfo.images[0] : "",
                name: shopInfo.activity_name,
                description: shopInfo.description,
                price: shopInfo.activity_price,
                id: shopInfo.id,
                unit: shopInfo.unit,
                num: 1,
                childPrice: shopInfo.activity_price,
                is_activity_cate: 1,
                delivery_type: shopInfo.delivery_type
            }]
            let data = {
                total: 1,
                totalPrice: shopInfo.activity_price,
                commodityList,
                shop_id: shopInfo.shop_id,
                name: shopInfo.name,
                is_active: 1
            };

            let url = "../confirmPay/main?data=" + JSON.stringify(data);
            wx.navigateTo({ url });
        },
        //改变收货地址
        selectAddress(state, data) {
            state.activeAddress = data
            wx.navigateBack({ delta: 1 })
        },
        //新增修改我的地址列表
        changeAddress(state, data) {
            let list = store.state.moduleMove.moveList
            if (data.status == 0) {
                list.unshift(data.data)
            } else {
                let index = list.findIndex(item => {
                    return item.id == data.data.id
                })
                data.data.isTouchMove = false
                list[index] = data.data
            }
        },
        //删除地址
        deleteAddress(state, data) {
            let list = store.state.moduleMove.moveList
            api.deleteAddress({ a_id: data.data.id }).then(res => {
                common.showSuccess("已删除")
                list.splice(data.index, 1)
            });
        },
        //获取地址列表
        getAddressList() {
            api.memberAddressList().then(res => {
                let list = res.info;
                list.forEach(item => (item.isTouchMove = false));
                store.commit("setMoveList", list);
            });
        }
    },
    getters: {
        commodityTotalPrice: state => state.commodityTotalPrice,
        commodityTotal: state => state.commodityTotal,
        commodityCate: state => state.commodityCate,
        commodityList: state => state.commodityList,
        cateValue: state => state.cateValue,
        cateId: state => state.cateId,
        commodityNoneData: state => state.commodityNoneData,
        menuNoneData: state => state.menuNoneData,
        shopMenuList: state => state.shopMenuList,
        menuId: state => state.menuId,
        menuValue: state => state.menuValue,
        menuTotalPrice: state => state.menuTotalPrice,
        menuTotal: state => state.menuTotal,
        license: state => state.license
    }
}
export default moduleShop