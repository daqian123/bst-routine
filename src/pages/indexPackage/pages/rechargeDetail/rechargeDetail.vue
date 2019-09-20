<template>
  <view class="rechargeDetail">
    <view class="content">
      <img src="../../assets/img/info/money_icon.png" class="money-icon" />
      <view class="content-text1">话费充值</view>
      <view class="content-text2">49.90</view>
    </view>
    <view class="cell-group">
      <view class="cell-item">
        <view class="cell-item-left">商品：</view>
        <view class="cell-item-right">话费充值</view>
      </view>
      <view class="cell-item">
        <view class="cell-item-left">订单号：</view>
        <view class="cell-item-right">444259796908133</view>
      </view>
      <view class="cell-item">
        <view class="cell-item-left">支付时间：</view>
        <view class="cell-item-right">2019-09-17 08:08</view>
      </view>
      <view class="cell-item">
        <view class="cell-item-left">支付方式：</view>
        <view class="cell-item-right">零钱</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.rechargeDetail {
  .pageBg(#f6f6f6);
  .content {
    text-align: center;
    padding: 80rpx 0;
    .money-icon {
      width: 88rpx;
      height: 88rpx;
    }
    &-text1 {
      margin: 12rpx 0 9rpx 0;
      font-size: 30rpx;
    }
    &-text2 {
      font-size: 48rpx;
    }
  }
  .cell-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 62rpx;
    padding: 0 24rpx;
    font-size: 24rpx;
  }
}
</style>