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
      <view class="list-item" v-for="(item,index) in list" :key="index">
        <view class="list-item-left">
          <img :src="item.icon" class="list-item-left-icon" />
        </view>
        <view class="list-item-right">
          <view class="list-title">{{item.title}}</view>
          <view class="list-description">{{item.description}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        { icon: "icon_1", title: "水电煤气", description: "便民舒心" },
        { icon: "icon_2", title: "话费充值", description: "快速到账" },
        { icon: "icon_3", title: "视频会员", description: "热销榜首" },
        { icon: "icon_4", title: "流量充值", description: "超值精品" },
        { icon: "icon_5", title: "Q币充值", description: "福利无限" },
        { icon: "icon_6", title: "加油卡充值", description: "优惠多多" }
      ]
    };
  },
  computed: {
    list() {
      this.arr.forEach(item => {
        item.icon = require(`../../assets/img/info/${item.icon}.png`);
      });
      return this.arr;
    }
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