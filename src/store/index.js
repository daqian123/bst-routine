
import api, { getRegeo } from "@/api"
import common from "@/utils/common"
import { store } from "@/store/store"
const moduleIndex = {
    state: {
        infoLoading: false,//信息和商户主页列表加载状态
        infoNoneMore: false,
        shopLoading: false,
        shopNoneMore: false,
        indexJoinFlag: false,
        shopJoinFlag: false,
        addressInfo: {},
        infoData: {},//主页信息
        infoList: [],//主页列表信息
        infoParam: { page: 1, keyword: "", area_code: "", sort: 1 },//信息查询参数
        activedistrict: '',//默认地区名
        shopData: {},//商户主页数据
        shopParam: {//商户查询参数
            lng: '',
            lat: '',
            area_code: '',
            sort: 1,
            keyword: '',
            industry_id: 0,
            page: 1
        },
        sellGoodParam: { city_code: "", keyword: "", page: 1 },//畅销产品
        sellGoodList: [],
        goodNoneMore: false,
        goodNoneData: false,
        goodLoading: false,
        cateList: [],//信息类目
        industryArray: [],//商户主页行业
        industryList: [],//商户行业
        weatherObj: '',//天气
        joinFlag: false,//首页显示加盟
        //indexJoinModal: false,
        shopJoinModal: false,
        shopNoneData: false,
        contentlist: "",//主页新闻列表
        addressStatus: false,//监听更换地址状态
        bannerObj: {
            indexBannerList: [],
            shopBannerList: [],
            infoTypeBannerList: [],
            shopTypeBannerList: [],
            infoDetailBannerList: [],
            mallBannerList: [],
            activityBannerList: []
        },
        circleList: []
    },
    mutations: {
        //扫码
        scanMiniCode(state) {
            common.scanCode()
        },
        getColumnCate(state, list) {
            state.cateList = list
        },
        getIndustryList(state, payload) {
            state.industryArray = payload.industryArray
            state.industryList = payload.industryList
        },
        //获取当前地理位置信息
        getMyLocationInfo() {
            getRegeo(res => {
                store.commit("getActiveAddress", { data: res, status: 1 });
            })
        },
        //获取天气
        getWeather(state, { area_name, area_code }) {
            api.getWeather({ area_name, area_code }).then(res => {
                state.weatherObj = res.info
            });
        },
        //获取默认地址
        getActiveAddress(state, info) {
            let { data, status } = info
            if (status == 2) {
                state.addressStatus = !state.addressStatus
            }
            wx.setStorageSync("address", data)
            state.activedistrict = data.district
            store.commit("getWeather", { area_name: data.district, area_code: data.code });
            store.commit('getIndexInfo', data)
            store.commit("getActiveInfo")
            store.commit('getBannerList', { index: 1, cid: 0 })
            store.commit("getActiveShopInfo")
            store.commit("cityCircle", data.code)
        },
        cityCircle(state, area_code) {
            api.cityCircle({ area_code }).then(res => {
                state.circleList = res.info;
            });
        },
        getIndexInfo(state, data) {
            api.getIndexInfo({ area_code: data.code, type: 1, id: 1 }).then(res => {
                let info = res.info
                info.cate = info.cate.filter(item => {
                    return item.status != 2 && item.name != '便民查询'
                });
                let indexBanner = [
                    {
                        url: "http://images.lexbst.com/common/lottery_banner.png",
                        type: { name: "幸运大转盘" }
                    }, {
                        url: "http://images.lexbst.com/common/vote_banner.png",
                        type: { name: "投票活动" }
                    }
                ]
                info.localActivity = indexBanner.concat(info.localActivity)
                state.infoData = res.info
                console.log(state.infoData)
            })
        },
        getBannerList(state, { index, cid }) {
            let name, type
            switch (index) {
                case 1:
                    name = 'indexBannerList'
                    type = 0
                    break;
                case 2:
                    name = 'shopBannerList'
                    type = 2
                    break;
                case 3:
                    name = 'infoTypeBannerList'
                    type = 1
                    break;
                case 4:
                    name = 'shopTypeBannerList'
                    type = 2
                    break;
                case 5:
                    name = 'infoDetailBannerList'
                    type = 3
                    break;
                case 6:
                    name = 'mallBannerList'
                    type = 4
                    break;
                case 7:
                    name = 'activityBannerList'
                    type = 5
                    break;
            }
            let area_code = wx.getStorageSync("address").code
            api.indexBanner({ area_code, type, cid }).then(res => {
                state.bannerObj[name] = res.info.data.images
            })
        },
        //条件查询默认第一页
        getActiveInfo(state) {
            common.showLoading("加载中")
            state.infoParam.page = 1
            state.infoParam.area_code = wx.getStorageSync("address").code
            store.commit("setInfoLoading")
            store.commit('refreshInfo')
        },
        //条件查询默认第一页
        getActiveShopInfo(state) {
            common.showLoading("加载中")
            let { code, lat, lng } = wx.getStorageSync("address")
            state.shopParam.lat = lat
            state.shopParam.lng = lng
            state.shopParam.page = 1
            state.shopParam.area_code = code
            store.commit("setShopLoading")
            store.commit('refreshShopInfo')
        },
        refreshInfo(state) {
            api.getInformation(state.infoParam).then(res => {
                wx.hideLoading()
                state.infoLoading = false
                let list = res.info.list
                if (list.length == 0) {
                    state.indexJoinFlag = true
                }
                state.infoParam.page++;
                state.infoList = list
            });
        },
        //获取信息
        getInformation(state) {
            api.getInformation(state.infoParam).then(res => {
                wx.hideLoading()
                state.infoLoading = false
                let list = res.info.list
                if (list.length == 0) {
                    state.infoNoneMore = true
                } else {
                    state.infoParam.page++;
                    state.infoList = state.infoList.concat(list);
                }
            });
        },
        refreshShopInfo(state) {
            api.getShopIndexList(state.shopParam).then(res => {
                wx.hideLoading()
                state.shopLoading = false
                let data = res.info
                data.list.forEach(item => {
                    item.hideMobile = common.setMobile(item.mobile).hideMobile;
                });
                data.message.forEach(list => {
                    list.title = list.title.substring(3, list.title.length - 4);
                });
                if (data.list.length == 0) {
                    if (state.shopParam.page == 1 && state.shopParam.keyword == "") {
                        state.shopJoinModal = true
                        state.shopJoinFlag = true
                        state.shopNoneData = false
                    } else {
                        state.shopJoinModal = false
                        state.shopJoinFlag = false
                        state.shopNoneData = true
                    }
                } else {
                    state.shopJoinModal = false
                }
                state.shopParam.page++
                state.shopData.list = data.list
                let newsShopList = data.message
                state.shopData = Object.assign({}, data, { list: state.shopData.list, newsShopList, activity_shop: data.activity_shop })
            });
        },
        //商户主页信息
        getShopInfo(state) {
            api.getShopIndexList(state.shopParam).then(res => {
                wx.hideLoading()
                state.shopLoading = false
                let data = res.info
                data.list.forEach(item => {
                    item.hideMobile = common.setMobile(item.mobile).hideMobile;
                });
                if (data.list.length == 0) {
                    state.shopNoneMore = true
                } else {
                    state.shopParam.page++;
                    state.shopData.list = state.shopData.list.concat(data.list);
                }
            });
        },
        formatHotGoodList(state) {
            state.sellGoodParam.city_code = wx.getStorageSync("address").city_code
            state.sellGoodParam.page = 1
            store.commit("refreshHotGoodList")
        },
        refreshHotGoodList(state) {
            state.goodLoading = true
            state.goodNoneData = false
            state.goodNoneMore = false
            api.sellGoodLists(state.sellGoodParam).then(res => {
                state.goodLoading = false
                let list = res.info
                if (list.length == 0) {
                    state.goodNoneData = true
                }
                state.sellGoodParam.page++;
                state.sellGoodList = list
            })
        },
        getHotGoodList(state) {
            state.goodLoading = true
            state.goodNoneData = false
            state.goodNoneMore = false
            api.sellGoodLists(state.sellGoodParam).then(res => {
                state.goodLoading = false
                let list = res.info
                if (list.length == 0 && state.sellGoodList.length == 0) {
                    state.goodNoneData = true
                } else if (list.length > 0) {
                    state.sellGoodParam.page++;
                    state.sellGoodList = state.sellGoodList.concat(list);
                } else {
                    state.goodNoneMore = true
                }
            })
        },
        setInfoLoading(state) {
            state.infoLoading = true
            state.infoNoneMore = false
            state.indexJoinFlag = false
        },
        setShopLoading(state) {
            state.shopLoading = true
            state.shopNoneMore = false
            state.shopJoinFlag = false
            state.shopNoneData = false
        },
        setShopJoinDialog(state, status) {
            state.shopJoinModal = status
        },

        hideInfoShopNoneMore(state) {
            state.infoNoneMore = false;
            state.shopNoneMore = false;
        }
    },
    getters: {
        infoLoading: state => state.infoLoading,
        infoNoneMore: state => state.infoNoneMore,
        shopLoading: state => state.shopLoading,
        shopNoneMore: state => state.shopNoneMore,
        indexJoinFlag: state => state.indexJoinFlag,
        shopJoinFlag: state => state.shopJoinFlag,
        shopJoinModal: state => state.shopJoinModal,
        infoParam: state => state.infoParam,
        infoData: state => state.infoData,
        infoList: state => state.infoList,
        weatherObj: state => state.weatherObj,
        cateList: state => state.cateList,
        addressStatus: state => state.addressStatus,
        activedistrict: state => state.activedistrict,
        shopParam: state => state.shopParam,
        shopData: state => state.shopData,
        industryArray: state => state.industryArray,
        contentlist: state => state.contentlist,
        shopNoneData: state => state.shopNoneData,
        sellGoodParam: state => state.sellGoodParam,
        sellGoodList: state => state.sellGoodList,
        goodNoneMore: state => state.goodNoneMore,
        goodNoneData: state => state.goodNoneData,
        goodLoading: state => state.goodLoading,
        bannerObj: state => state.bannerObj,
        industryList: state => state.industryList,
        circleList: state => state.circleList
    }
}
export default moduleIndex
