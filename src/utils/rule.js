/*
正则校验
*/
import { getDate2 } from "@/utils/util"
import { showToast, showSuccess, showLoading } from "@/utils/pointDialog";
export default {
    ruleEmail(email) {
        let re = new RegExp(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)
        let flag = re.test(email)
        if (!flag) {
            showToast("请输入正确的邮箱");
        }
        return flag
    },
    ruleMobile(mobile) {
        let re = new RegExp(/^1[3456789]\d{9}$/);
        let flag = re.test(mobile)
        if (!flag) {
            showToast("请输入正确的手机号码");
        }
        return flag
    },
    ruleNumber(number) {
        let re = new RegExp(/^[+]{0,1}(\d+)$/);
        let flag = re.test(number) || number < 1
        if (!flag) {
            showToast("请输入正确的座位数");
        }
        return flag
    },
    ruleFloatNumber(number, text = "请输入正确的数字") {
        let re = new RegExp(/^\d+(\.\d+)?$/)
        let flag = re.test(number)
        if (!flag) {
            showToast(text);
        }
        return flag
    },
    ruleIsDiscountNum(number) {
        let re = new RegExp(/^\d+(\.\d+)?$/)
        let flag = re.test(number) || number < 0 || number > 10
        if (!flag) {
            showToast("请输入正确的折扣优惠，如8.5折，输入8.5");
        }
        return flag
    },
    ruleIsEmpty(formdata, obj) {
        for (let i in obj) {
            obj[i] = obj[i].toString().replace(/\s/g, "");
        }
        return Object.assign(formdata, obj)
    },
    ruleCardNum(num) {
        let re = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
        let flag = re.test(num)
        if (!flag) {
            showToast("请输入正确的身份证号码");
        }
        return flag
    },
    ruleImg(arr) {
        if (!/\.(jpg|jpeg|png|JPG|PNG|GIF|gif)$/.test(arr[0])) {
            showToast("图片类型必须是.jpeg,jpg,png,bmp中的一种");
            return false;
        }
        return true
    },
    ruleVideo(video) {
        if (!/\.(wmv|mp4|avi|rmvb|AVI|RMVB|WMV|MP4)$/.test(video)) {
            showToast("视频格式必须是.wmv,mp4,avi,rmvb中的一种");
            return false;
        }
        return true
    },
    //校验图片格式是否符合
    ruleImg2(arr) {
        let flag = true
        for (let i = 0; i < arr.length; i++) {
            if (!this.ruleImg([arr[i]])) flag = false
        }
        return flag
    },
    //校验最大上传
    ruleMaxUpload(val, tempFiles, arr) {
        if (tempFiles.length + arr.length > val) {
            showToast(`最大只能上传${val}张图片`)
            return false
        }
        return true
    },
    //是否有空
    arrIsEmpty(arr) {
        let flag = true
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                flag = false
            }
        }
        return flag
    },
    //截取图片地址
    getImgUrl(arr) {
        return arr.map(item => {
            return item = item.substring("http://images.lexbst.com".length, item.length)
        })
    },
    //最小上传
    minUpload(arr, val) {
        if (arr.length < 1) {
            val == 1 ? showToast("请上传至少一张轮播图片") : showToast("请上传至少一张店铺图集")
            return false
        }
        return true
    },
    //校验图片大小
    ruleFileSize(arr) {
        let flag = true
        arr.forEach(item => {
            if (item.size / 1024 / 1024 >= 18) {
                showToast("上传图片大小不能超过18Mb")
                flag = false
            }
        });
        return flag
    },
    ruleTime(time, type) {
        let date
        if (type == 2) {
            date = `${getDate2(new Date())} ${time}:00`
        } else {
            date = `${time}:00`
        }
        let minTime = new Date().getTime()
        let startTime = new Date(date).getTime()
        if ((startTime - minTime) / 1000 / 60 < 30) {
            showToast("发车时间不能小于当前时间半小时，请重新选择")
            return false
        }
        return true
    }
}