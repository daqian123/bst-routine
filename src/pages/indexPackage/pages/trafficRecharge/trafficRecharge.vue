<template>
  <view class="recharge trafficRecharge">
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
    <view class="list disabled-list" v-if="disabled">
      <view v-for="item in list" :key="item" class="list-item">{{item}}M</view>
    </view>
    <template v-else>
      <view class="title">
        <view class="title-name">生活服务</view>
        <view class="title-tips">到账后生效，当月有效</view>
      </view>
      <view class="list">
        <view
          class="list-item"
          v-for="(item,index) in list1"
          :key="index"
          :class="{active:formData.id==item.id}"
          @click="changeValue(item)"
        >
          <view class="list-item-top">{{item.flowvalue}}</view>
          <view class="list-item-bottom">{{item.price}}元</view>
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
          :class="{active:formData.id==item.id}"
          @click="changeValue(item)"
        >
          <view class="list-item-top">{{item.flowvalue}}</view>
          <view class="list-item-bottom">{{item.price}}元</view>
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
          :class="{active:formData.id==item.id}"
          @click="changeValue(item)"
        >
          <view class="list-item-top">{{item.flowvalue}}</view>
          <view class="list-item-bottom">{{item.price}}元</view>
        </view>
      </view>
    </template>
    <button class="add-btn" @click="formSubmit">立即充值</button>
  </view>
</template>

<script>
import api from "@/api";
import { showToast, showSuccess, showModal } from "@/utils/pointDialog";
export default {
  data() {
    return {
      list: [30, 50, 100, 200, 500, 1000],
      list1: [],
      list2: [],
      list3: [],
      disabled: true,
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
      showToast("小程序暂不支持通讯录功能");
      return;
    },
    inputValue() {
      let { mobile } = this.formData;
      if (this.regexp.test(mobile)) {
        api.trafficPackage({ mobile }).then(res => {
          let { month, week, day } = res.info;
          this.list1 = month;
          this.list2 = week;
          this.list3 = day;
          this.disabled = false;
        });
      }
    },
    changeValue({ id, price }) {
      this.formData.id = this.formData.id == id ? "" : id;
      this.formData.money = price;
    },
    formSubmit() {
      let { mobile, id } = this.formData;
      if (!mobile) {
        showToast("请输入手机号码");
        return;
      }
      if (!this.regexp.test(mobile)) {
        showToast("请输入正确的手机号码");
        return;
      }
      if (!id) {
        showToast("请选择套餐");
        return;
      }
      api.trafficOrder(this.formData).then(res => {});
    }
  },
  onLoad() {
    let { mobile } = wx.getStorageInfoSync("userInfo");
    this.formData = {
      mobile,
      id: "",
      money: ""
    };
    this.disabled = true;
    this.inputValue();
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