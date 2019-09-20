import api from "@/api"
import { showToast } from "@/utils/pointDialog"
import { store } from "@/store/store"
const moduleHitchhiking = {
    state: {
        typeList: [
            { car_models: "小型汽车", type: "02" },
            { car_models: "大型汽车", type: "01" },
            { car_models: "新能源小型汽车", type: "52" },
            { car_models: "新能源大型汽车", type: "51" },
            { car_models: "挂车", type: "15" }
        ]
    },
    mutations: {
        isApprove(state, data) {
            api.getCarDriver().then(res => {
                let cars = res.info.cars;
                let drivers = res.info.drivers;
                if (drivers.length == 0) {
                    if (!store.state.moduleLogin.iosSystemStatus) {
                        showToast("小程序暂时不支持ios用户认证");
                        return;
                    }
                    showToast("您还未认证，请先去进行司机认证")
                    setTimeout(() => {
                        wx.navigateTo({ url: "../driverApprove/main" })
                    }, 1000)
                } else if (cars.length == 0) {
                    if (!store.state.moduleLogin.iosSystemStatus) {
                        showToast("小程序暂时不支持ios用户认证");
                        return;
                    }
                    showToast("您还没有认证通过的车辆，请先去进行车辆认证")
                    setTimeout(() => {
                        wx.navigateTo({ url: "../carApprove/main" })
                    }, 1000)
                } else {
                    wx.navigateTo({ url: `../releaseRide/main?data=${data}` });
                }
            })
        }
    }
}
export default moduleHitchhiking