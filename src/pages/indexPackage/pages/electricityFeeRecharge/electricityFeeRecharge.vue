<template>
  <view class="rechargeWaterFee page-bg">
    <view class="head">
      <img src="../../assets/img/info/convenient1_icon_5.png" class="head-icon" />&nbsp;电费
    </view>
    <view class="cell-group">
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right">合肥供电</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费户号</view>
        <view class="input-right">456764564</view>
      </view>
      <view class="cell-item">
        <view class="label">户名</view>
        <view class="input-right">大钱</view>
      </view>
      <view class="cell-item">
        <view class="label">住址</view>
        <view class="input-right">南翔汽车城</view>
      </view>
      <view class="cell-item">
        <view class="label">当前可用余额</view>
        <view class="input-right">0</view>
      </view>
      <view class="cell-item">
        <view class="label">当前欠费金额</view>
        <view class="input-right">56</view>
      </view>
      <view class="cell-item">
        <view class="label">充值金额</view>
        <view class="input-right">
          <input type="text" placeholder="请输入充值金额" class="input-value" />
        </view>
      </view>
    </view>
    <button class="add-btn">立即充值</button>
    <view class="fix-bottom">缴费记录</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>