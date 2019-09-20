import { showModal } from "@/utils/pointDialog";
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
        showModal(res => {
            if (res.confirm) {
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
}