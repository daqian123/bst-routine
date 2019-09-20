<template>
  <view class="empty-content">
    <img class="empty-content-image" src="/static/img/noneOrder.png" mode="aspectFit" />
    <view class="tips">登录后才能看到订单哦</view>
    <view class="sq-box">
      <button class="sq-btn" open-type="getUserInfo" @getuserinfo="getWxUserInfo" plain="true">点击登录</button>
    </view>
  </view>
</template>

<script>
import authorize from "@/utils/authorize";
export default {
  props: {
    src: {
      type: String,
      default: "empty"
    }
  },
  methods: {
    async getWxUserInfo(e) {
      if (e.mp.detail.rawData) {
        await authorize.getUserInfo();
        this.$emit("authorizeAfter");
      } else {
        this.$showToast("获取用户信息失败");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding-bottom: 120rpx;

  &-image {
    width: 200rpx;
    height: 200rpx;
  }
  .tips {
    margin: 40rpx auto;
    font-size: 28rpx;
    color: #777;
  }
  .sq-box {
    display: flex;
    justify-content: center;
    .sq-btn {
      border-color: #3761f1;
      color: #3761f1;
    }
  }
}
</style>
