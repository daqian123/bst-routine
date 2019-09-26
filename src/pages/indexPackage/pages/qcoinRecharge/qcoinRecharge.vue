<template>
  <view class="qcoinRecharge">
    <view class="cell">
      <view class="cell-left">Q币充值</view>
      <view class="cell-right">充值记录</view>
    </view>
    <view class="form-input">
      <input v-model="formData.qq" type="number" class="input-value" placeholder="请输入充值号码" />
      <icon type="clear" size="20" color="#eee" v-if="formData.qq" @click="formData.qq=''" />
    </view>
    <view class="list">
      <view
        class="list-item"
        @click="changeValue(item,index)"
        v-for="(item,index) in list"
        :key="index"
        :class="{active:active==index}"
      >
        <view class="list-item-top">{{item}}</view>
      </view>
      <view class="list-item" @click="customNum" :class="{active:active==-1}">
        <view class="list-item-top">自定义</view>
      </view>
    </view>
    <view class="form-input" v-if="active==-1">
      <input
        v-model="count"
        type="number"
        :disabled="disabled"
        placeholder="请输入要充值的Q币数量"
        class="input-value"
        @input="inputValue"
      />
      <icon type="clear" size="20" color="#eee" v-if="count" @click="count=null" />
    </view>
    <view class="price">{{formData.money}}</view>
    <button class="add-btn" @click="formSubmit">立即充值</button>
  </view>
</template>

<script>

import WxValidate from "@/utils/WxValidate";
export default {
  data() {
    return {
      formData: {
        qq: "",
        money: "0.00",
        number: null
      },
      count: null,
      active: null,
      discount: "",
      disabled: false,
      list: [10, 20, 30, 50, 100],
      validate: ""
    };
  },
  methods: {
    customNum() {
      this.active = -1;
      this.formData.money = "0.00";
    },
    inputValue() {
      this.formData.money = (Number(this.count * this.discount) / 10).toFixed(
        2
      );
      this.formData.number = this.count;
    },
    formSubmit() {
      this.getMessage();
      let { qq } = this.formData;
      let params = this.active == -1 ? { qq, count: this.count } : { qq };
      if (!this.validate.checkForm(params)) {
        const error = this.validate.errorList[0];
        this.$showToast(error.msg);
        return false;
      }
      this.$api.qcoinOrder(this.formData).then(res => {});
    },
    changeValue(value, index) {
      this.active = index;
      this.formData.number = value;
      this.formData.money = (Number(value * this.discount) / 10).toFixed(2);
    },
    getMessage() {
      const message = {
        qq: {
          required: "请输入充值QQ账号",
          rangelength: "请输入5到11位QQ账号"
        },
        count: { required: "请输入自定义Q币数量" }
      };
      const rules = {
        qq: { required: true, rangelength: [5, 11] },
        count: { required: true, min: 1 }
      };
      this.validate = new WxValidate(
        this.active != -1 ? { qq: rules.qq } : rules,
        this.active != -1 ? { qq: message.qq } : message
      );
    }
  },
  onLoad() {
    this.formData.qq = "";
    this.$api.qcoinDiscount().then(res => {
      this.discount = res.info.discount;
      this.changeValue(this.list[0], 0);
      this.getMessage();
    });
  }
};
</script>

<style lang="less" scoped>
.cell {
  .flexLayout(space-between, center);
  height: 96rpx;
  margin: 0 24rpx;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  &-left,
  &-right {
    height: 32rpx;
    line-height: 32rpx;
  }
  &-left {
    padding-left: 14rpx;
    border-left: 4rpx #416ce3 solid;
  }
  &-right {
    font-size: 24rpx;
    color: #666;
  }
}
.form-input {
  margin: 0 24rpx;
  padding: 0 10rpx;
  .flexLayout(space-between, center);
  height: 90rpx;
  .input-value {
    flex: 1;
  }
}
.list {
  padding: 0 24rpx;
  display: flex;
  flex-wrap: wrap;
  // margin-bottom: 31rpx;
  &-item {
    .flexLayout(center, center, column);
    width: 220rpx;
    height: 120rpx;
    border-radius: 15rpx;
    border: 1px solid #416ce3;
    padding: 10rpx 0;
    box-sizing: border-box;
    margin: 0 21rpx 22rpx 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &-top {
      font-size: 36rpx;
      color: #333;
    }
    &-bottom {
      font-size: 24rpx;
      color: #416ce3;
    }
    &.active {
      background: #416ce3;
      border: none;
      .list-item-top,
      .list-item-bottom {
        color: #fff;
      }
    }
  }
}
.price {
  padding: 0 24rpx;
  font-size: 48rpx;
  color: #416ce3;
}
.add-btn {
  display: block;
  background: #416ce3;
  color: #fff;
  font-size: 32rpx;
  margin: 40rpx 24rpx;
  height: 80rpx;
  line-height: 80rpx;
  letter-spacing: 8rpx;
  &:active {
    opacity: 0.8;
  }
}
</style>