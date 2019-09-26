<template>
  <view class="payVideoVip">
    <view class="main">
      <img src="../../assets/img/info/aqy.png" class="logo" v-if="info.video_type==1" />
      <img src="../../assets/img/info/tx.png" class="logo logo-sm" v-if="info.video_type==2" />
      <img src="../../assets/img/info/yk.png" class="logo" v-if="info.video_type==3" />
      <view class="main-title">{{info.name}}{{info.type_text}}视频会员</view>
      <view class="main-price">¥ {{info.discount_price}}</view>
    </view>
    <view class="form-input">
      <input v-model="formData.account" type="number" class="input-value" placeholder="请输入充值号码" />
      <icon
        type="clear"
        size="20"
        color="#eee"
        v-if="formData.account"
        @click="formData.account=''"
      />
    </view>
    <view class="tips">备注：充值前请仔细核对账号是否正确，如充错自行承担责任。</view>
    <button class="add-btn" @click="formSubmit">确认支付</button>
  </view>
</template>

<script>

export default {
  data() {
    return {
      formData: {},
      info: {}
    };
  },
  methods: {
    formSubmit() {
      if (!this.formData.account) {
        this.$showToast("请输入账号");
        return;
      }
      this.$api.videoOrder(this.formData).then(res => {});
    }
  },
  onLoad(options) {
    let info = JSON.parse(options.data);
    this.info = info;
    this.formData = {
      account: "",
      id: info.id,
      money: info.discount_price
    };
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 75rpx 0 45rpx 0;
  text-align: center;
  color: #333;
  .logo {
    width: 108rpx;
    height: 108rpx;
  }
  .logo-sm {
    height: 97rpx;
  }
  &-title {
    margin: 36rpx 0 23rpx 0;
    font-size: 30rpx;
  }
  &-price {
    font-size: 34rpx;
  }
}
.form-input {
  margin: 0 24rpx;
  padding: 0 10rpx;
  border-bottom: 1px solid #eee;
  .flexLayout(space-between, center);
  height: 90rpx;
  .input-value {
    flex: 1;
  }
}
.tips {
  margin: 62rpx 0;
  padding: 0 24rpx;
  font-size: 24rpx;
  color: #999;
}
.add-btn {
  display: block;
  background: #416ce3;
  color: #fff;
  font-size: 32rpx;
  margin: 60rpx 24rpx;
  height: 80rpx;
  line-height: 80rpx;
  letter-spacing: 8rpx;
  &:active {
    opacity: 0.8;
  }
}
</style>