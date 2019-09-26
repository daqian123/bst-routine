<template>
  <view class="recharge">
    <view class="record">充值记录</view>
    <view class="cell-item">
      <view class="cell-left">
        <input
          @input="inputValue"
          v-model="formData.mobile"
          type="text"
          maxlength="11"
          placeholder="请输入充值手机号"
          class="input-value"
        />
        <icon
          type="clear"
          size="20"
          color="#eee"
          v-if="formData.mobile"
          @click="formData.mobile=''"
        />
      </view>
      <img src="../../assets/img/info/phone_book.png" class="phone_book-icon" @click="phoneContact" />
    </view>
    <view class="title">
      <view class="title-name">生活服务</view>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list"
        :key="index"
        :class="{active:active==index}"
        @click="changeValue(item,index)"
      >
        <view class="list-item-top">{{item.amount}}元</view>
        <view class="list-item-bottom">售价：{{item.price}}元</view>
      </view>
    </view>
    <view class="cell-tips">
      惠&nbsp;
      <text class="black">{{info.discount_text}}折</text>
      &nbsp;减{{discount_price}}元
    </view>
    <button class="add-btn" @click="openModal">{{info.price}}元&nbsp;立即充值</button>
    <van-popup :show="visible" position="bottom" @close="visible=false">
      <view class="modal">
        <view class="modal-head">
          确定付款
          <img src="../../assets/img/info/cancel_icon.png" class="cancel-icon" />
        </view>
        <view class="modal-content">
          <view class="modal-content-top">¥&nbsp;{{info.price}}</view>
          <view class="modal-content-center">订单信息：{{info.amount}}元话费充值</view>
          <view class="modal-content-bottom">
            <view class="modal-content-bottom-left">付款方式：</view>
            <view class="modal-content-bottom-right">
              微信&nbsp;
              <van-icon name="arrow" @click="visible=false" />
            </view>
          </view>
        </view>
        <button class="add-btn" @click="formSubmit">立即付款</button>
      </view>
    </van-popup>
  </view>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      active: 0,
      discount_price: null,
      info: {},
      list: [
        { price: 9.98, amount: 10, discount_text: 9.98 },
        { price: 29.94, amount: 30, discount_text: 9.98 },
        { price: 49.9, amount: 50, discount_text: 9.98 },
        { price: 99.8, amount: 100, discount_text: 9.98 },
        { price: 199.6, amount: 200, discount_text: 9.98 },
        { price: 492.5, amount: 500, discount_text: 9.98 }
      ],
      formData: {
        mobile: "",
        id: "",
        money: ""
      },
      regexp: new RegExp(/^1[3456789]\d{9}$/)
    };
  },
  methods: {
    phoneContact() {
      this.$showToast("小程序暂不支持通讯录功能");
      return;
    },
    openModal() {
      let { mobile } = this.formData;
      if (!mobile) {
        this.$showToast("请输入手机号码");
        return;
      }
      if (!this.regexp.test(mobile)) {
        this.$showToast("请输入正确的手机号码");
        return;
      }
      this.visible = true;
    },
    async inputValue() {
      let { mobile } = this.formData;
      if (this.regexp.test(mobile)) {
        await this.$api.phonePackage({ mobile }).then(res => {
          this.list = res.info;
        });
      }
      this.changeValue(this.list[0], 0);
    },
    changeValue(info, index) {
      this.active = index;
      this.info = info;
      this.discount_price = (info.amount - info.price).toFixed(2);
      this.formData.id = info.id;
      this.formData.money = info.price;
    },
    formSubmit() {
      this.$api.phoneOrder(this.formData).then(res => {});
    }
  },
  onLoad() {
    this.active = 0;
    let { mobile } = wx.getStorageInfoSync("userInfo");
    this.formData.mobile = mobile;
    this.inputValue();
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>