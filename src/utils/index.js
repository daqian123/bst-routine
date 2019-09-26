import api from "@/api/index"
import { store } from "@/store/store"
import { getArray } from "@/utils/util"
import common from "@/utils/common"
/**
 * 获取公用接口数据存入缓存
 * */
//获取所有栏目子类型
const getColumnCate = function (id = 0) {
  api.getColumnCate({ id: id }).then(res => {
    let list = res.info.list.filter(item => {

      return item.name != "聊天交友" && item.name != "微友求助" && item.name != "城际搭车";
    })
    store.commit("getColumnCate", list)
  })
}
//获取所有行业子类型
const getSelectIndustry = function () {
  api.getSelectIndustry({ pid: 0 }).then(res => {
    let list = res.info.list.filter(item => {
      if (item.name == "金融服务") item.name = "财经服务";
      return item.status && item.name != "医疗健康"
    })
    list.forEach(item => {
      item.icon = "http://images.lexbst.com" + item.icon
    });
    store.commit("getIndustryList", { industryArray: getArray(list, 8), industryList: list })
  });
}
const getSystemInfo = function () {
  wx.getSystemInfo({
    success: res => {
      if (res.platform == "ios") {
        store.commit("setSystemStatus", false);
      } else {
        store.commit("setSystemStatus", true);
      }
    }
  });
}
const getAreaCode = (arr, fn) => {
  api.getAreaCode({ city_name: arr[1], area_name: arr[2] }).then(
    res => { fn(res) },
    () => { common.showToast("获取地区信息失败，请更换其他地址"); }
  );
}
const getProvinceCity = () => {
  api.getProvinceCity().then(res => {
    wx.setStorageSync("provinceCityList", res.info.list)
  });
}
export { getColumnCate, getSelectIndustry, getSystemInfo, getAreaCode, getProvinceCity }