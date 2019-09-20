<template>
  <view class="videoVip">
    <view class="cell-title">优酷视频</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list1" :key="index">
        <img src="../../assets/img/info/yk_logo.png" class="list-logo1" />
        <view class="list-item-top">{{item.time}}</view>
        <view class="list-item-center">
          ¥
          <text class="font-xs">{{item.discount}}</text>
        </view>
        <view class="list-item-bottom">{{item.price}}/{{item.unit}}</view>
      </view>
    </view>
    <view class="cell-title">腾讯视频</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list2" :key="index">
        <img src="../../assets/img/info/tx_logo.png" class="list-logo2" />
        <view class="list-item-top">{{item.time}}</view>
        <view class="list-item-center">
          ¥
          <text class="font-xs">{{item.discount}}</text>
        </view>
        <view class="list-item-bottom">{{item.price}}/{{item.unit}}</view>
      </view>
    </view>
    <view class="cell-title">爱奇艺视频</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list3" :key="index">
        <img src="../../assets/img/info/aqy_logo.png" class="list-logo3" />
        <view class="list-item-top">{{item.time}}</view>
        <view class="list-item-center">
          ¥
          <text class="font-xs">{{item.discount}}</text>
        </view>
        <view class="list-item-bottom">{{item.price}}/{{item.unit}}</view>
      </view>
    </view>
    <button class="add-btn">立即充值</button>
    <view class="fix-bottom">缴费记录</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        { time: "周卡", discount: "5.72", price: "9", unit: "周" },
        { time: "季卡", discount: "35.56", price: "56", unit: "季" },
        { time: "年卡", discount: "125.73", price: "198", unit: "年" }
      ],
      list2: [
        { time: "月卡", discount: "15", price: "20", unit: "月" },
        { time: "季卡", discount: "43.5", price: "58", unit: "季" },
        { time: "年卡", discount: "148.50", price: "198", unit: "年" }
      ],
      list3: [
        { time: "月卡", discount: "12.90", price: "20", unit: "月" },
        { time: "季卡", discount: "37.41", price: "58", unit: "季" },
        { time: "年卡", discount: "127.71", price: "198", unit: "年" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.videoVip {
  .cell-title {
    font-size: 32rpx;
    padding: 0 24rpx;
    height: 70rpx;
    line-height: 70rpx;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 55rpx;
    &-item {
      width: 200rpx;
      height: 240rpx;
      border-radius: 15rpx;
      border: 1px solid #eee;
      padding: 20rpx;
      box-sizing: border-box;
      line-height: 44rpx;
      text-align: center;
      margin: 0 20rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .list-logo1 {
        width: 113rpx;
        height: 23rpx;
      }
      .list-logo2 {
        width: 113rpx;
        height: 30rpx;
      }
      .list-logo3 {
        width: 112rpx;
        height: 38rpx;
      }
      &-top {
        font-size: 27rpx;
        color: #333;
      }
      &-center {
        color: #416ce3;
        font-size: 24rpx;
        .font-xs {
          font-size: 43rpx;
        }
      }
      &-bottom {
        font-size: 23rpx;
        color: #333;
        opacity: 0.66;
        text-decoration: line-through;
      }
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
  .fix-bottom {
    font-size: 24rpx;
    color: #416ce3;
    text-align: center;
  }
}
</style>