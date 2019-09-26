import common from "@/utils/common";
import { store } from "@/store/store";
export default {
    navHomePage(mid, active = "") {
        let { lat, lng, code } = wx.getStorageSync("address");
        wx.navigateTo({
            url:
                `/pages/personalCenter/homepage/main?param=
                ${JSON.stringify({
                    lat, lng, area_code: code, mid, active
                })}`
        });
    },
    loginTips() {
        common.showModal(confirm => {
            if (confirm) {
                store.commit("isShowLoginModal", true);
                wx.switchTab({ url: "/pages/personalCenter/personalCenter/main" });
            }
        }, "请先登录后再尝试");
    },
    navInfoDetail(is_job, id, status) {
        let url, params;
        if (is_job == 1) {
            params = JSON.stringify({ id, status });
            url = `/pages/indexPackage/pages/jobDetail/main?param=${params}`;
        } else if (is_job == 2) {
            params = JSON.stringify({ id, status });
            url = `/pages/indexPackage/pages/activityDetail/main?param=${params}`;
        } else if (is_job == 3) {
            params = JSON.stringify({ id, status });
            url = `/pages/indexPackage/pages/topicDetail/main?param=${params}`;
        } else {
            params = JSON.stringify({ id });
            url = `/pages/index/infoDetail/main?param=${params}`;
        }
        wx.navigateTo({ url });
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
                    common.showModal(confirm => {
                        if (confirm) {
                            wx.redirectTo({ url: "/pages/shopPackage/pages/addApprove/main?param=" + JSON.stringify({ status: 2, is_food_cate }) });
                        }
                    }, "您的商户未通过认证，请重新认证后再尝试", false)
                    break;
                case 3:
                    common.showModal(confirm => {
                        if (confirm) {
                            wx.redirectTo({ url: "/pages/shopPackage/pages/addApprove/main?param=" + JSON.stringify({ status: 0, is_food_cate }) });
                        }
                    }, "您的商户未认证，请先认证后再尝试", false)
                    break;
            }
        })
    }
}