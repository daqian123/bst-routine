<template>
  <view class="hydroelectricGas">
    <navigator url="../rechargeRecord/main">
      <view class="head-title">缴费记录</view>
    </navigator>
    <view class="list-content">
      <block v-for="(item,index1) in list" :key="index1">
        <view class="list-title">{{item.name}}</view>
        <view
          class="list"
          v-for="(list,index2) in item.lists"
          :key="index2"
          @click="recharge(list)"
        >
          <view class="list-left">
            <img
              src="../../assets/img/info/convenient1_icon_1.png"
              class="list-icon"
              v-if="list.type==1"
            />
            <img
              src="../../assets/img/info/convenient1_icon_2.png"
              class="list-icon"
              v-if="list.type==2"
            />
            <img
              src="../../assets/img/info/convenient1_icon_3.png"
              class="list-icon"
              v-if="list.type==3"
            />
          </view>
          <view class="list-center">
            <view class="list-center-title">
              <template v-if="list.type==1">水费</template>
              <template v-if="list.type==2">电费</template>
              <template v-if="list.type==3">燃气费</template>
            </view>
            <view class="list-center-num" v-if="list.account">{{list.account}}</view>
          </view>
          <i class="iconfont icon-jinru"></i>
        </view>
      </block>
    </view>
    <view class="head-title2">新增缴费</view>
    <view class="nav-list">
      <view class="nav-list-item" v-for="(item,index) in arr" :key="index">
        <img :src="item.icon" class="nav-list-icon" @click="addHydroelectricGas(item.type)" />
        <view class="nav-list-title">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      list: [],
      arr: [
        {
          icon: require("../../assets/img/info/convenient1_icon_4.png"),
          title: "水费缴费",
          type: 1
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_5.png"),
          title: "电费缴费",
          type: 2
        },
        {
          icon: require("../../assets/img/info/convenient1_icon_6.png"),
          title: "煤气缴费",
          type: 3
        }
      ]
    };
  },
  methods: {
    recharge({ account, type, id }) {
      if (account) {
        let path;
        switch (Number(type)) {
          case 1:
            path = "waterFeeRecharge";
            break;
          case 2:
            path = "electricityFeeRecharge";
            break;
          case 3:
            path = "gasRecharge";
            break;
        }
        wx.navigateTo({ url: `../${path}/main?id=${id}` });
      } else {
        this.addHydroelectricGas(type);
      }
    },
    addHydroelectricGas(type) {
      wx.navigateTo({ url: "../addPayment/main?type=" + type });
    }
  },
  onShow() {
    this.$api.householdlists().then(res => {
      this.list = res.info;
    });
  }
};
</script>

<style lang="less" scoped>
.hydroelectricGas {
  .pageBg(#f8f6f9);
  padding-bottom: 30px;
  box-sizing: border-box;
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