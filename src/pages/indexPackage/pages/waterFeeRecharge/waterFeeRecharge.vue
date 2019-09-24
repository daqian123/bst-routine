<template>
  <view class="waterFeeRecharge page-bg">
    <view class="head">
      <img src="../../assets/img/info/convenient1_icon_4.png" class="head-icon" />&nbsp;水费
    </view>
    <view class="cell-group">
      <view class="cell-item cell-item-xs">
        <view class="label">应缴金额</view>
        <view class="input-right">168</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right">长丰自来水厂</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费户号</view>
        <view class="input-right">765746456</view>
      </view>
      <view class="cell-item">
        <view class="label">户名</view>
        <view class="input-right">大钱</view>
      </view>
    </view>
    <button class="add-btn">立即充值</button>
    <navigator url="../rechargeRecord/main">
      <view class="fix-bottom">缴费记录</view>
    </navigator>
  </view>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {};
  },
  async onLoad(options) {
    await api.queryPost({ id: options.id });
    let code = await api.queryPosts({ id: options.id });
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>