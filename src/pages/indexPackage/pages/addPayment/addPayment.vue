<template>
  <view class="addPayment">
    <view class="head">
      <template v-if="type==1">
        <img src="../../assets/img/info/convenient1_icon_4.png" class="head-icon" />&nbsp;水费
      </template>
      <template v-if="type==2">
        <img src="../../assets/img/info/convenient1_icon_5.png" class="head-icon" />&nbsp;电费
      </template>
      <template v-if="type==3">
        <img src="../../assets/img/info/convenient1_icon_6.png" class="head-icon" />&nbsp;燃气费
      </template>
    </view>
    <view class="cell-group">
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right" @click="changeInstitution">
          <text
            :class="[institution.title?'':'placeholder']"
          >{{institution.title?institution.title:'请选择机构'}}</text>&nbsp;
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="cell-item">
        <view class="label">水费户号</view>
        <view class="input-right">
          <input v-model="formData.account" type="number" placeholder="请输入户号" class="input-value" />
          <icon
            type="clear"
            size="20"
            color="#eee"
            v-if="formData.account"
            @click="formData.account=''"
          />
        </view>
      </view>
      <view class="cell-item">
        <view class="label">分组</view>
        <view class="input-right">
          <picker @change="changeRange" :range="range" range-key="name">
            <view class="picker" :class="[range[index]?'':'placeholder']">
              {{index>-1?range[index].name:'请选择分组'}}&nbsp;
              <van-icon name="arrow" />
            </view>
          </picker>
        </view>
      </view>
    </view>
    <view class="protocol">
      <i-checkbox :checked="checked" color="#416ce3" @change="changeChecked"></i-checkbox>&nbsp;
      <navigator url="/pages/personalCenter/protocol/main">
        <text class="protocol-text">我已阅读并同意《百事通信息平台协议》</text>
      </navigator>
    </view>
    <button class="add-btn" @click="formSumbit">确认添加</button>
  </view>
</template>

<script>
import api from "@/api";
import { mapGetters } from "vuex";
import WxValidate from "@/utils/WxValidate";
import { showToast, showSuccess, showModal } from "@/utils/pointDialog";
export default {
  data() {
    return {
      checked: false,
      range: [],
      index: -1,
      formData: {},
      type: "",
      validate: {}
    };
  },
  computed: {
    ...mapGetters(["institution"])
  },
  methods: {
    changeInstitution() {
      wx.navigateTo({ url: "../institution/main?type=" + this.type });
    },
    changeChecked(e) {
      this.checked = e.mp.detail.current;
    },
    changeRange(e) {
      this.index = e.mp.detail.value;
      this.formData.group_id = this.range[this.index].id;
    },
    formSumbit() {
      console.log(this.formData);
      if (!this.validate.checkForm(this.formData)) {
        const error = this.validate.errorList[0];
        showToast(error.msg);
        return false;
      }
      if (!this.checked) {
        showToast("请选择协议");
        return;
      }
      api.addhHydroelectricGas(this.formData).then(res => {
        showSuccess("添加成功");
        showModal(res => {
          if (res.confirm) {
            this.formatData();
          } else {
            wx.navigateBack({ delta: 1 });
          }
        }, "添加成功，是否继续添加");
      });
    },
    formatData() {
      this.$store.commit("setInstitution", {});
      this.index = -1;
      this.formData = {
        type: this.type,
        account: null,
        product_id: "",
        group_id: ""
      };
    }
  },
  watch: {
    institution(val) {
      this.formData.product_id = val.product_id;
    }
  },
  onLoad(options) {
    const message = {
      product_id: { required: "请选择缴费单位" },
      account: { required: "请输入账号" },
      group_id: { required: "请选择分组" }
    };
    const rules = {
      product_id: { required: true },
      account: { required: true },
      group_id: { required: true }
    };
    this.validate = new WxValidate(rules, message);
    this.type = options.type;
    this.formatData();
    api.selectGroup().then(res => {
      this.range = res.info;
    });
  }
};
</script>

<style lang="less" scoped>
.addPayment {
  border-top: 31rpx solid #f8f6f9;
  .pageBg(#fff);
  .head {
    .flexLayout(flex-start, center);
    height: 126rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
    font-size: 30rpx;
    color: #333;
    .head-icon {
      width: 64rpx;
      height: 64rpx;
      margin-right: 22rpx;
    }
  }
  .cell-item {
    display: flex;
    align-items: center;
    height: 100rpx;
    margin: 0 24rpx;
    .input-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      .input-value,
      .picker {
        width: 100%;
        height: 100%;
        text-align: right;
      }
      .input-value {
        padding: 0 20rpx;
      }
    }
    .label {
      min-width: 180rpx;
    }
    .placeholder {
      color: #888;
    }
  }
  .protocol {
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      font-size: 24rpx;
      color: #333;
      opacity: 0.5;
    }
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
}
</style>