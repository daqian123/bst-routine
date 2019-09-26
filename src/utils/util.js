


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
// 基础版的防抖函数
let timeout;
function debounce(func, wait) {
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}
// 基础版的节流函数
let timeout2 = null;
function throttle(func, wait) {
    return function () {
        if (!timeout2) {
            timeout2 = setTimeout(function () {
                clearTimeout(timeout2);
                timeout2 = null;
                func();
            }, wait);
        }
    };
}
export { getArray, bdtogcj, navigateToMiniProgram, bdEncrypt, debounce, throttle }