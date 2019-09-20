<template>
  <view class="recharge trafficRecharge">
    <view class="record">充值记录</view>
    <view class="cell-item">
      <view class="cell-left">
        <input type="text" placeholder="请输入充值数目" />
      </view>
      <img src="../../assets/img/info/phone_book.png" class="phone_book-icon" />
    </view>
    <view class="title">
      <view class="title-name">生活服务</view>
      <view class="title-tips">到账后生效，当月有效</view>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list1"
        :key="index"
        :class="{active:active==index}"
      >
        <view class="list-item-top">{{item.num}}</view>
        <view class="list-item-bottom">{{item.price}}</view>
      </view>
    </view>
    <view class="title">
      <view class="title-name">流量月包</view>
      <view class="title-tips">到账后生效，当月有效</view>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list2"
        :key="index"
        :class="{active:active==index}"
      >
        <view class="list-item-top">{{item.num}}</view>
        <view class="list-item-bottom">{{item.price}}</view>
      </view>
    </view>
    <view class="title">
      <view class="title-name">流量日包</view>
      <view class="title-tips">到账后生效，24小时有效</view>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list3"
        :key="index"
        :class="{active:active==index}"
      >
        <view class="list-item-top">{{item.num}}</view>
        <view class="list-item-bottom">{{item.price}}</view>
      </view>
    </view>
    <button class="add-btn">立即充值</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list1: [
        { num: "500M", price: "15.00" },
        { num: "1G", price: "21.00" },
        { num: "2G", price: "35.00" },
        { num: "3G", price: "42.00" },
        { num: "5G", price: "60.00" },
        { num: "10G", price: "75.00" }
      ],
      list2: [{ num: "1G", price: "9.9" }],
      list3: [{ num: "1G", price: "3.00" }, { num: "2G", price: "5.00" }]
    };
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>
<style lang="less" scoped>
.trafficRecharge {
  .title {
    .title-tips {
      border: none;
      padding: 0;
    }
  }
  .list {
    &-item {
      &-top {
        font-size: 36rpx;
        color: #416ce3;
      }
    }
  }
}
</style>