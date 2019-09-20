<template>
  <view class="qcoinRecharge">
    <view class="cell">
      <view class="cell-left">Q币充值</view>
      <view class="cell-right">充值记录</view>
    </view>
    <view class="form-input">
      <input type="number" maxlength="11" class="input-value" placeholder="请输入充值号码" />
      <icon type="clear" size="20" color="#eee" />
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list"
        :key="index"
        :class="{active:active==index}"
      >
        <view class="list-item-top">10 Q币</view>
      </view>
    </view>
    <view class="price">9.8元</view>
    <button class="add-btn">立即充值</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [1, 2, 3, 4, 5]
    };
  }
};
</script>

<style lang="less" scoped>
.cell {
  .flexLayout(space-between, center);
  height: 96rpx;
  margin: 0 24rpx;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  &-left,
  &-right {
    height: 32rpx;
    line-height: 32rpx;
  }
  &-left {
    padding-left: 14rpx;
    border-left: 4rpx #416ce3 solid;
  }
  &-right {
    font-size: 24rpx;
    color: #666;
  }
}
.form-input {
  margin: 0 24rpx;
  padding: 0 10rpx;
  .flexLayout(space-between, center);
  height: 90rpx;
  .input-value {
    flex: 1;
  }
}
.list {
  padding: 0 24rpx;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 31rpx;
  &-item {
    .flexLayout(center, center, column);
    width: 220rpx;
    height: 120rpx;
    border-radius: 15rpx;
    border: 1px solid #416ce3;
    padding: 10rpx 0;
    box-sizing: border-box;
    margin: 0 21rpx 22rpx 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &-top {
      font-size: 36rpx;
      color: #333;
    }
    &-bottom {
      font-size: 24rpx;
      color: #416ce3;
    }
    &.active {
      background: #416ce3;
      border: none;
      .list-item-top,
      .list-item-bottom {
        color: #fff;
      }
    }
  }
}
.price {
  padding: 0 24rpx;
  font-size: 48rpx;
  color: #416ce3;
}
.add-btn {
  display: block;
  background: #416ce3;
  color: #fff;
  margin: 40rpx 24rpx;
  height: 80rpx;
  line-height: 80rpx;
  letter-spacing: 8rpx;
  &:active {
    opacity: 0.8;
  }
}
</style>