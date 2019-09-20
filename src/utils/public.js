import common from "@/utils/common"
import { store } from "@/store/store"
import api from "@/api/index";
//拆分成二维数组
const getArray = function (list, val) {
    let x = 0;
    let arr2 = [];
    for (let i = 0;
        i < Math.ceil(list.length / val); i++) {
        let arr = [];
        for (let j = 0; j < val; j++) {
            if (x >= list.length) {
                arr2.push(arr);
                return arr2;
            }
            arr[j] = list[x];
            x++;
        }
        arr2.push(arr);
    }
    return arr2
}
function sendAgentId(options = "") {
    if (options) {
        let param;
        try {
            param = JSON.parse(options.param)
        } catch (error) {
            param = { agent_id: "" }
        }
        param.agent_id &&
            (store.state.moduleLogin.loginStatus
                ? api.getAgentid({ agent_id: param.agent_id }).then(res => {
                    console.log(res)
                })
                : store.commit("setAgentId", param.agent_id))
        console.log(param)
        return param;
    }
    return {}
}
//新闻数组对象去重
function removeArrRepeat(list) {
    var hash = {};
    list = list.reduce(function (item, next) {
        hash[next.pubDate] != undefined && hash[next.source] != undefined
            ? ""
            : (hash[next.pubDate] = true && (hash[next.source] = true) && item.push(next));
        return item;
    }, []);
    return list
}
//高德转百度
function bdEncrypt(lng, lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = lng, y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return { lat: bd_lat, lng: bd_lng }
}
//百度转高德
function bdtogcj(lng, lat) {
    if (lng.toString().split('.')[1].length === 8) {
        // 百度的经纬度
        let pi = 3.14159265358979324 * 3000.0 / 180.0
        let x = lng - 0.0065
        let y = lat - 0.006
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi)
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi)
        let wxLng = z * Math.cos(theta)
        let wxLat = z * Math.sin(theta)
        return { lng: wxLng.toFixed(6), lat: wxLat.toFixed(6) }
    } else {
        // 腾讯的经纬度
        return { lng: lng, lat: lat }
    }
}
function navigateToMiniProgram(path, params = "") {
    let paths = params ? `pages${path}/main?param=${params}` : `pages${path}/main`
    wx.navigateToMiniProgram({
        appId: "wx496791b3fac7f1bd",
        path: paths,
        envVersion: "release",//测试develop 正式release
        success(res) {
            console.log(res);
        },
        fail: err => {
            console.log(err)
        }
    });
}
function setScrollVal(el, height) {
    const query = wx.createSelectorQuery();
    query.select(el).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
        common.getListInfo(res2 => {
            let scrollValue = res[1].scrollTop + res[0].top - res2.height;
            wx.pageScrollTo({
                scrollTop: scrollValue,
                duration: 0
            });
        }, height);
    });
}
export { getArray, sendAgentId, removeArrRepeat, bdtogcj, navigateToMiniProgram, bdEncrypt, setScrollVal }