<script>
import Vue from "vue";
import api from "@/api";
import common from "@/utils/common";
import authorize from "@/utils/authorize";
import { getStorage } from "@/utils/storage";
import { store } from "@/store/store";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    //挂载全局
    authorize.viewAuthorize();
    for (const key in common) {
      Vue.prototype[`$${key}`] = common[key];
    }
    Vue.prototype.$api = api;
    Vue.prototype.$store = store;
  }
};
</script>

<style>
</style>
