

import { formartNum } from './pointDialog'
//锚点定位
const pageScrollTo = (scrollTop, duration) => wx.pageScrollTo({
    scrollTop: scrollTop,
    duration: duration
})
//获取日期格式
const getDate = function (date) {       //时间戳
    let time = date * 1000
    return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()}`;
}
const getTimeDate = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
const getDate2 = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
const getDate3 = function (date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
const getDate4 = function (time) {
    time = time * 1000
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${formartNum(date.getHours())}:${formartNum(date.getMinutes())}`
}
export { pageScrollTo, getDate, getDate2, getTimeDate, getDate3, getDate4 }