<template>
  <view class="recharge">
    <view class="record">充值记录</view>
    <view class="cell-item">
      <view class="cell-left">
        <input type="text" placeholder="请输入充值数目" />
      </view>
      <img src="../../assets/img/info/phone_book.png" class="phone_book-icon" />
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
      >
        <view class="list-item-top">10元</view>
        <view class="list-item-bottom">售价：9.8元</view>
      </view>
    </view>
    <view class="cell-tips">
      惠&nbsp;
      <text class="black">9.98折</text>&nbsp;减0.02元
    </view>
    <button class="add-btn" @click="visible=true">9.98元&nbsp;立即充值</button>
    <van-popup :show="visible" position="bottom" @close="visible=false">
      <view class="modal">
        <view class="modal-head">
          确定付款
          <img src="../../assets/img/info/cancel_icon.png" class="cancel-icon" />
        </view>
        <view class="modal-content">
          <view class="modal-content-top">¥&nbsp;9.98</view>
          <view class="modal-content-center">订单信息：10元话费充值</view>
          <view class="modal-content-bottom">
            <view class="modal-content-bottom-left">付款方式：</view>
            <view class="modal-content-bottom-right">
              微信&nbsp;
              <van-icon name="arrow" @click="visible=false" />
            </view>
          </view>
        </view>
        <button class="add-btn">立即付款</button>
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
      list: [1, 2, 3, 4, 5]
    };
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>