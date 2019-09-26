<template>
  <view class="videoVip">
    <img src="../../assets/img/info/video_vip_banner.png" class="banner" mode="widthFix" />
    <view class="cell-title">分类</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list" :key="index" @click="changeValue(item)">
        <img src="../../assets/img/info/yk_logo.png" class="list-logo1" v-if="item.video_type==2" />
        <img src="../../assets/img/info/tx_logo.png" class="list-logo2" v-if="item.video_type==3" />
        <img src="../../assets/img/info/aqy_logo.png" class="list-logo3" v-if="item.video_type==1" />
        <view class="list-item-top">{{item.type_text}}</view>
        <view class="list-item-center">
          ¥
          <text class="font-xs">{{item.discount_price}}</text>
        </view>
        <view class="list-item-bottom">{{item.amount}}/{{item.txt}}</view>
      </view>
    </view>
    <view class="fix-bottom">购买记录</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    changeValue(data) {
      wx.navigateTo({
        url: "../payVideoVip/main?data=" + JSON.stringify(data)
      });
    }
  },
  onLoad() {
    this.$api.videoPackage().then(res => {
      this.list = res.info;
    });
  }
};
</script>

<style lang="less" scoped>
.videoVip {
  .banner {
    width: 100%;
    height: 208rpx;
  }
  .cell-title {
    font-size: 32rpx;
    padding: 0 24rpx;
    height: 90rpx;
    line-height: 90rpx;
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
  .fix-bottom {
    margin: 40rpx 0;
    font-size: 24rpx;
    color: #416ce3;
    text-align: center;
  }
}
</style>