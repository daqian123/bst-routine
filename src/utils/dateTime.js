//日期时间选择器
function withData(param) {
    return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start, end) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(withData(i));
    }
    return array;
}
function getMonthDay(year, month) {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

    switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            array = getLoopArray(1, 31)
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            array = getLoopArray(1, 30)
            break;
        case '02':
            array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
            break;
        default:
            array = '月份格式不正确，请重新输入！'
    }
    return array;
}
function getNewDateArry() {
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour = withData(newDate.getHours()),
        minu = withData(newDate.getMinutes()),
        seco = withData(newDate.getSeconds());

    return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear, endYear, date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);

    dateTimeArray.forEach((current, index) => {
        dateTime.push(current.indexOf(defaultDate[index]));
    });
    let dateTime2 = [], newArray = [[], [], ["至"], [], []]
    newArray[0] = getLoopArray(0, 23);
    newArray[1] = getLoopArray(0, 59);
    newArray[3] = getLoopArray(0, 23);
    newArray[4] = getLoopArray(0, 59);
    let hours = withData(new Date().getHours())
    let minutes = withData(new Date().getMinutes())
    let arr = ["09", "00", '', "18", "00"]
    newArray.forEach((current, index) => {
        dateTime2.push(current.indexOf(arr[index]));
    });
    let timeArray = [...dateTimeArray]
    timeArray.splice(5, 1)
    return {
        dateArray: dateTimeArray,
        dateTime: dateTime,
        newArray: newArray,
        dateTime2: dateTime2,
        timeArray: timeArray
    }
}
const startYear = new Date().getFullYear(), endYear = new Date().getFullYear() + 10 //起止年份
const { dateTime, dateArray, dateTime2, newArray, timeArray } = dateTimePicker(startYear, endYear);// 获取完整的年月日 时分秒，以及默认显示的数组
const dateValue2 = `${newArray[0][dateTime2[0]]}:${newArray[1][dateTime2[1]]}-${newArray[3][dateTime2[3]]}:${newArray[4][dateTime2[4]]}`
const dateValue = `${dateArray[0][dateTime[0]]}-${
    dateArray[1][dateTime[1]]
    }-${dateArray[2][dateTime[2]]} ${dateArray[3][dateTime[3]]}:${
    dateArray[4][dateTime[4]]
    }:${dateArray[5][dateTime[5]]}`;


export { dateTimePicker, getMonthDay, dateTime, dateArray, dateValue, dateTime2, newArray, dateValue2, withData, getNewDateArry, timeArray }
//判断是否是闰年
function isLeapYear(year) {
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}
//获取当前月有多少天
function getMonthDays(month) {
    let days
    let flag = isLeapYear(new Date().getFullYear())
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        days = 31
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        days = 30
    }
    if (month == 2) {
        days = flag ? 29 : 28
    }
    return days
}
//获取当前月第一天是周几
function getWeeksDay() {
    let date = new Date();
    date.setDate(1);
    return date.getDay()
}
//获取当前月日历
function getCalendar() {
    //当前月的天数和当前月第一天是周几
    let month = new Date().getMonth() + 1
    let days = getMonthDays(month)
    let firstWeekDay = getWeeksDay()
    let firstWeek = new Array(days)
    for (let i = 0; i < firstWeek.length; i++) {
        firstWeek[i] = { day: i + 1, isMonthDay: true }
    }
    //获取上个月的最后一周不满一周的日期
    let lastMonth = (month - 1) == 0 ? 12 : (month - 1)
    let lastMonthDays = getMonthDays(lastMonth)
    let lastWeek = new Array(firstWeekDay === 0 ? 7 : firstWeekDay - 1)
    for (let i = 0; i < lastWeek.length; i++) {
        lastWeek[i] = { day: (lastMonthDays - (lastWeek.length - i - 1)), isMonthDay: false }
    }
    //获取下个月的第一周不满一周的日期
    // let nextMonth = (month + 1) == 13 ? 1 : (month + 1)
    // let nextMonthDays = getMonthDays(lastMonth)
    let nextWeek = new Array(42 - firstWeek.length - lastWeek.length)
    for (let i = 0; i < nextWeek.length; i++) {
        nextWeek[i] = { day: i + 1, isMonthDay: false }
    }
    return { lastWeek, firstWeek, nextWeek }
}
function getMonthDate() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`
}
function getTodayDate() {
    let date = new Date();
    return `${date.getMonth() + 1}-${withData(date.getDate())}`
}
let { lastWeek, firstWeek, nextWeek } = getCalendar()

export { lastWeek, firstWeek, nextWeek, getMonthDate, getTodayDate }