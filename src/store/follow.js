import Vue from "vue"
import { store } from "@/store/store"
import common from "@/utils/common"
import api from "@/api";
const moduleFollow = {
    state: {
        followList: [],//收藏信息、商户
        params: {      //收藏列表参数
            type: 1,
            area_code: null,
            lat: null,
            lng: null,
            page: 1
        },
        followLoading: false,
        followNoneData: false,
        followNoneMore: false
    },
    mutations: {
        //初始化收藏列表和参数
        formatFollowList(state, type) {
            state.followList = []
            let res = wx.getStorageSync("address");
            state.params = {
                type: type,
                area_code: res.code,
                lat: res.lat,
                lng: res.lng,
                page: 1
            }
            store.commit("getFollowList", state.params)
        },
        //获取收藏列表
        getFollowList(state) {
            state.followLoading = true
            state.followNoneData = false
            state.followNoneMore = false
            api.getFollowList(state.params).then(res => {
                state.followLoading = false;
                let list = res.info.list;
                list.forEach(item => {
                    item.hideMobile = common.setMobile(item.mobile).hideMobile;
                });
                if (list.length == 0 && state.followList.length == 0) {
                    state.followNoneData = true;
                } else if (list.length > 0) {
                    state.params.page++;
                    state.followList = state.followList.concat(list);
                } else {
                    state.followNoneMore = true;
                }
            });
        }
    },
    getters: {
        followLoading: state => state.followLoading,
        followNoneData: state => state.followNoneData,
        followNoneMore: state => state.followNoneMore
    }
}
export default moduleFollow