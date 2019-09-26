
<script>
import authorize from "@/utils/authorize";
import { store } from "@/store/store";
import Vue from "vue";

import { getColumnCate, getSelectIndustry, getSystemInfo } from "@/utils/index";

export default {
  created() {
    authorize.viewAuthorize();
    getSystemInfo();
    let dots = wx.getStorageSync("dots");
    if (!dots) {
      dots = {
        releaseDot: false,
        videoDot: false,
        personalDot: false,
        propsDot: false,
        vipDot: false,
        tutorialDot: false
      };
      wx.setStorageSync("dots", dots);
    }
    if (!dots.releaseDot) {
      wx.showTabBarRedDot({ index: 2 });
    }
    if (!dots.videoDot) {
      wx.showTabBarRedDot({ index: 3 });
    }
    if (!dots.personalDot) {
      wx.showTabBarRedDot({ index: 4 });
    }
    getColumnCate(); //缓存所有信息栏目和子类型，侧边模态框
    getSelectIndustry(); //缓存所有行业和子类型，侧边模态框
  }
};
</script>
