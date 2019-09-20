<template>
  <view class="addPayment">
    <view class="head">
      <img src="../../assets/img/info/convenient1_icon_4.png" class="head-icon" />&nbsp;水费
    </view>
    <view class="cell-group">
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right">
          长丰自来水厂&nbsp;
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="cell-item">
        <view class="label">水费户号</view>
        <view class="input-right">
          <input type="text" placeholder="请输入户号" class="input-value" />
        </view>
      </view>
      <view class="cell-item">
        <view class="label">分组</view>
        <view class="input-right">
          <picker @change="changeMachine" :range="range">
            <view class="picker" :class="[range[index]?'':'placeholder']">
              {{index>-1?machine[index]:'请选择分组'}}&nbsp;
              <van-icon name="arrow" />
            </view>
          </picker>
        </view>
      </view>
    </view>
    <view class="protocol">
      <i-checkbox-group color="#416ce3">
        <i-checkbox></i-checkbox>
      </i-checkbox-group>&nbsp;
      <text class="protocol-text">我已阅读并同意《百事通信息平台协议》</text>
    </view>
    <button class="add-btn">确认添加</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      range: ["我家", "公司"],
      index: -1
    };
  }
};
</script>

<style lang="less" scoped>
.addPayment {
  border-top: 31rpx solid #f8f6f9;
  .pageBg(#fff);
  .head {
    .flexLayout(flex-start, center);
    height: 126rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
    font-size: 30rpx;
    color: #333;
    .head-icon {
      width: 64rpx;
      height: 64rpx;
      margin-right: 22rpx;
    }
  }
  .cell-item {
    display: flex;
    align-items: center;
    height: 100rpx;
    margin: 0 24rpx;
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
  .protocol {
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      font-size: 24rpx;
      color: #333;
      opacity: 0.5;
    }
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
}
</style>