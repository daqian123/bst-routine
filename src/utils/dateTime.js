
//时间戳转时间
const getDateStamp = function (date) {
    date = date * 1000
    return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()}`;
}
//获取当前时间
const getNewDateTime = function () {
    let date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
//年月日
const getDate = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
export { getDateStamp, getNewDateTime, getDate }