<template>
  <view class="fuelCardRecharge">
    <img src="../../assets/img/info/card_banner.png" class="banner" />
    <view class="card-info">
      <img
        src="../../assets/img/info/add_oil_card.png"
        class="card-btn"
        v-if="!oilInfo"
        @click="addOil"
      />
      <template v-else>
        <img src="../../assets/img/info/oil_card.png" class="card-btn" @click="selectOil" />
        <text class="card-num">{{oilInfo.oilcardnumber}}</text>
      </template>
    </view>
    <view class="list">
      <view
        class="list-item"
        v-for="(item,index) in list"
        :key="index"
        :class="{active:index==active}"
        @click="active=index"
      >{{item}}元</view>
    </view>
    <view class="cell-item">
      <view class="cell-item-left">优惠券</view>
      <view class="cell-item-right">
        无优惠券&nbsp;
        <van-icon name="arrow" />
      </view>
    </view>
    <view class="footer">
      <view class="footer-left">
        实付：
        <text class="price">￥{{list[active]}}</text>
      </view>
      <view class="footer-right btn-hover" @click="formSubmit(active)">立即充值</view>
    </view>
  </view>
</template>

<script>
import api from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0,
      list: [500, 1000],
      info: []
    };
  },
  computed: {
    ...mapGetters(["oilInfo"])
  },
  methods: {
    addOil() {
      wx.navigateTo({ url: "../addFuelCard/main" });
    },
    selectOil() {
      wx.navigateTo({ url: "../selectFuelCard/main" });
    },
    formSubmit(active) {
      if (!this.oilInfo) {
        showToast("请先添加加油卡");
        return;
      }
      let params = {
        amount: this.list[active],
        oilcardnumber: this.oilInfo.oilcardnumber
      };
      api.oilOrder(params).then(res => {});
    }
  },
  onShow() {
    api.myOilList().then(res => {
      let list = res.info;
      this.$store.commit("setOilInfo", list.length > 0 ? list[0] : "");
    });
  }
};
</script>

<style lang="less" scoped>
.fuelCardRecharge {
  .pageBg(#f8f6f9);
  .banner {
    width: 100%;
    height: 208rpx;
  }
  .card-info {
    position: relative;
    margin: 31rpx 0;
    width: 100%;
    height: 173rpx;
    background: #fff;
    .card-btn {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .card-num {
      position: absolute;
      left: 210rpx;
      top: 36rpx;
      color: #fff;
      font-size: 34rpx;
    }
  }
  .list {
    background: #fff;
    padding: 0 24rpx;
    display: flex;
    flex-wrap: wrap;
    &-item {
      margin: 0 20rpx 29rpx 0;
      width: 220rpx;
      height: 120rpx;
      color: #333;
      opacity: 0.8;
      font-size: 36rpx;
      text-align: center;
      line-height: 120rpx;
      border: 1px solid #eee;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .active {
      background: url("../../assets/img/info/card_active.png") no-repeat left
        top / 100% 100%;
    }
  }
  .cell-item {
    .flexLayout(space-between, center);
    background: #fff;
    height: 90rpx;
    border-top: 1px solid #eee;
    padding: 0 24rpx;
  }
  .footer {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 100rpx;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    line-height: 100rpx;
    font-size: 30rpx;
    &-left {
      flex: 1;
      padding: 0 24rpx;
      color: #333;
      .price {
        color: #fb8e39;
      }
    }
    &-right {
      width: 198rpx;
      height: 100%;
      color: #fff;
      text-align: center;
      background: #fb8e39;
    }
  }
}
</style>