<template>
  <view class="addPayment">
    <view class="cell-group">
      <view class="cell-item">
        <view class="label">加油卡类型：</view>
        <view class="input-right">
          <picker @change="changeMachine" :range="range">
            <view class="picker" :class="[range[index]?'':'placeholder']">
              {{index>-1?machine[index]:'请选择加油卡类型'}}&nbsp;
              <van-icon name="arrow" />
            </view>
          </picker>
        </view>
      </view>
      <view class="cell-item">
        <view class="label">加油卡号：</view>
        <view class="input-right">
          <input type="text" placeholder="请输入卡号" class="input-value" />
        </view>
      </view>
      <view class="cell-item">
        <view class="label">本人姓名：</view>
        <view class="input-right">
          <input type="text" placeholder="请输入姓名" class="input-value" />
        </view>
      </view>
    </view>
    <view class="tips">请确认加油卡号、姓名与办卡时信息是否保持一致</view>
    <button class="add-btn">确认添加</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      range: ["中国石化加油卡", "中国石油加油卡"],
      index: -1
    };
  }
};
</script>

<style lang="less" scoped>
.addPayment {
  border-top: 31rpx solid #f8f6f9;
  .cell-item {
    display: flex;
    align-items: center;
    height: 100rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
    .input-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      .input-value,
      .picker {
        width: 100%;
        height: 100%;
        text-align: right;
      }
    }
    .label {
      min-width: 180rpx;
    }
    .placeholder {
      color: #888;
    }
  }
  .tips {
    text-align: center;
    font-size: 24rpx;
    color: #333;
    opacity: 0.5;
    margin: 40rpx 0;
  }
  .add-btn {
    display: block;
    background: #416ce3;
    color: #fff;
    margin: 60rpx 24rpx;
    height: 80rpx;
    line-height: 80rpx;
    letter-spacing: 8rpx;
    &:active {
      opacity: 0.8;
    }
  }
}
</style>