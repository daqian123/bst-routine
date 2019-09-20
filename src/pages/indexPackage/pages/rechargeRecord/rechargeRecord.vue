<template>
  <view class="rechargeRecord">
    <view class="cell-title">全部交易类型</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in [1,2,3,4]" :key="index">
        <view class="list-item-left">
          <view class="list-item-left-top">话费充值</view>
          <view class="list-item-left-center">支付方式</view>
          <view class="list-item-left-bottom">昨天：08：08</view>
        </view>
        <view class="list-item-right">49.90</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.cell-title {
  height: 113rpx;
  text-align: center;
  line-height: 113rpx;
  font-size: 30rpx;
  background: #f6f6f6;
  opacity: 0.72;
}
.list {
  &-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 23rpx 24rpx 18rpx 24rpx;
    &:last-child {
      border: none;
    }
    &-left {
      .flexLayout(space-between, flex-start, column);
      line-height: 44rpx;
      flex: 1;
      &-top {
        font-size: 30rpx;
      }
      &-center {
        font-size: 24rpx;
      }
      &-bottom {
        font-size: 24rpx;
      }
    }
    &-right {
      font-size: 48rpx;
      color: #333;
    }
  }
}
</style>