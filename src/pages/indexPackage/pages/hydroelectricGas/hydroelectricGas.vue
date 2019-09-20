<template>
  <view class="hydroelectricGas">
    <view class="head-title">缴费记录</view>
    <view class="list-content">
      <view class="list-title">我家</view>
      <view class="list" v-for="(item,index) in list1" :key="index">
        <view class="list-left">
          <img :src="item.icon" class="list-icon" />
        </view>
        <view class="list-center">
          <view class="list-center-title">{{item.title}}</view>
          <view class="list-center-num">{{item.num}}</view>
        </view>
        <i class="iconfont icon-jinru"></i>
      </view>
      <view class="list-title">房东</view>
      <view class="list" v-for="(item,index) in list2" :key="index">
        <img :src="item.icon" class="list-icon" />
        <view class="list-center">
          <view class="list-center-title">{{item.title}}</view>
          <view class="list-center-num">{{item.num}}</view>
        </view>
        <i class="iconfont icon-jinru"></i>
      </view>
    </view>
    <view class="head-title2">新增缴费</view>
    <view class="nav-list">
      <view class="nav-list-item" v-for="(item,index) in list3" :key="index">
        <img :src="item.icon" class="nav-list-icon" />
        <view class="nav-list-title">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        {
          icon: require("../../assets/img/info/convenient1_icon_1.png"),
          title: "水费",
          num: "57464654"
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_2.png"),
          title: "电费",
          num: "57464654"
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_3.png"),
          title: "燃气费",
          num: "57464654"
        }
      ],
      list2: [
        {
          icon: require("../../assets/img/info/convenient1_icon_1.png"),
          title: "水费",
          num: "57464654"
        }
      ],
      list3: [
        {
          icon: require("../../assets/img/info/convenient1_icon_4.png"),
          title: "水费缴费"
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_5.png"),
          title: "电费缴费"
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_6.png"),
          title: "煤气缴费"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.hydroelectricGas {
  .pageBg(#f8f6f9);
  .head-title {
    background: #fff;
    height: 118rpx;
    padding: 24rpx;
    text-align: right;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #333;
    opacity: 0.72;
  }
  .list-content {
    margin: 0 24rpx;
    box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.1);
    border-radius: 30rpx;
    position: relative;
    top: -31rpx;
    background: #fff;
    .list-title {
      padding: 30rpx 23rpx;
      font-size: 30rpx;
      color: #333;
    }
    .list {
      .flexLayout(flex-start, center);
      padding: 20rpx 23rpx 40rpx 23rpx;
      &-icon {
        margin-right: 40rpx;
        &:nth-child(1) {
          width: 39rpx;
          height: 46rpx;
        }
        &:nth-child(2) {
          width: 42rpx;
          height: 50rpx;
        }
        &:nth-child(2) {
          width: 41rpx;
          height: 47rpx;
        }
      }
      .list-center {
        flex: 1;
        &-title {
          font-size: 30rpx;
          color: #333;
        }
        &-num {
          font-size: 24rpx;
          color: #666;
          opacity: 0.6;
        }
      }
    }
  }
  .head-title2 {
    padding: 33rpx 46rpx 28rpx 46rpx;
    font-size: 30rpx;
  }
  .nav-list {
    .flexLayout(flex-start, center);
    margin: 0 24rpx;
    box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.1);
    border-radius: 30rpx;
    height: 180rpx;
    &-item {
      flex: 1;
      text-align: center;
    }
    &-icon {
      width: 64rpx;
      height: 64rpx;
    }
    &-title {
      margin: 10rpx 0;
      font-size: 24rpx;
      color: #333;
    }
  }
}
</style>