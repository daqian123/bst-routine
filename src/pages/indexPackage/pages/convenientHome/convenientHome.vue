<template>
  <view class="convenientHome">
    <img class="banner" src="../../assets/img/info/banner.png" mode="widthFix" />
    <view class="query">
      <img class="query-btn" src="../../assets/img/info/convenient.png" mode="widthFix" />
    </view>
    <view class="title">
      <view class="title-name">生活服务</view>
      <view class="title-tips">贴心服务助美好生活</view>
    </view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list" :key="index" @click="navPath(item)">
        <view class="list-item-left">
          <img :src="item.icon" class="list-item-left-icon" />
        </view>
        <view class="list-item-right">
          <view class="list-title">{{item.title}}</view>
          <view class="list-description">{{item.desc}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    navPath(item) {
      let path;
      switch (item.title) {
        case "水电煤气":
          path = "hydroelectricGas";
          break;
        case "话费充值":
          path = "recharge";
          break;
        case "视频会员":
          path = "videoVip";
          break;
        case "流量充值":
          path = "trafficRecharge";
          break;
        case "Q币充值":
          path = "qcoinRecharge";
          break;
        case "加油卡充值":
          path = "fuelCardRecharge";
          break;
      }
      wx.navigateTo({ url: `../${path}/main` });
    }
  },
  onLoad() {
    api.convenientHome().then(res => {
      this.list = res.info;
    });
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 205rpx;
}
.query {
  margin: 30rpx 0 33rpx 0;
  text-align: center;
  &-btn {
    width: 491rpx;
    height: 111rpx;
  }
}
.title {
  margin: 0 24rpx 46rpx 24rpx;
  .title-name {
    padding-left: 15rpx;
    height: 32rpx;
    line-height: 32rpx;
    border-left: 4rpx solid #5a97e7;
    margin-bottom: 16rpx;
    font-size: 36rpx;
    color: #333;
  }
  .title-tips {
    font-size: 24rpx;
    color: #666;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 24rpx;
  &-item {
    display: flex;
    padding: 47rpx 23rpx;
    background: rgba(248, 246, 249, 1);
    width: 336rpx;
    height: 169rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    &:nth-child(odd) {
      margin-right: 29rpx;
    }
    &-left {
      margin-right: 38rpx;
      &-icon {
        width: 75rpx;
        height: 75rpx;
      }
    }
    &-right {
      .flexLayout(space-between, flex-start, column);
      .list-title {
        font-size: 32rpx;
        color: #333;
      }
      .list-description {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}
</style>