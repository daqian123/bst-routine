<template>
  <view class="addPayment">
    <form @submit="formSubmit">
      <view class="cell-group">
        <view class="cell-item">
          <view class="label">加油卡类型：</view>
          <view class="input-right">
            中国石化加油卡
            <!-- <picker @change="changeMachine" :range="range">
            <view class="picker" :class="[range[index]?'':'placeholder']">
              {{index>-1?machine[index]:'请选择加油卡类型'}}&nbsp;
              <van-icon name="arrow" />
            </view>
            </picker>-->
          </view>
        </view>

        <view class="cell-item">
          <view class="label">加油卡号：</view>
          <view class="input-right">
            <input
              v-model="formData.oilcardnumber"
              name="oilcardnumber"
              type="text"
              placeholder="请输入卡号"
              class="input-value"
            />
          </view>
        </view>
        <view class="cell-item">
          <view class="label">本人姓名：</view>
          <view class="input-right">
            <input
              v-model="formData.username"
              name="username"
              type="text"
              placeholder="请输入姓名"
              class="input-value"
            />
          </view>
        </view>
      </view>
      <view class="tips">请确认加油卡号、姓名与办卡时信息是否保持一致</view>
      <button class="add-btn" form-type="submit">确认添加</button>
    </form>
  </view>
</template>

<script>
import api from "@/api";
import WxValidate from "@/utils/WxValidate";
import { showToast, showSuccess, showModal } from "@/utils/pointDialog";
export default {
  data() {
    return {
      range: ["中国石化加油卡", "中国石油加油卡"],
      index: -1,
      formData: {
        username: "",
        oilcardnumber: ""
      }
    };
  },
  methods: {
    formSubmit(e) {
      console.log(e);
      if (!this.validate.checkForm(e.mp.detail.value)) {
        const error = this.validate.errorList[0];
        showToast(error.msg);
        return false;
      }
      api.addOil(this.formData).then(res => {
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
      this.formData = {
        username: "",
        oilcardnumber: ""
      };
    }
  },
  onLoad() {
    const message = {
      oilcardnumber: {
        required: "请输入加油卡号",
        rangelength: "请输入19位加油卡号"
      },
      username: { required: "请输入姓名", rangelength: "请输入2~4个汉字姓名" }
    };
    const rules = {
      oilcardnumber: { required: true, rangelength: [19, 19] },
      username: { required: true, rangelength: [2, 4] }
    };
    this.validate = new WxValidate(rules, message);
    this.formatData();
  }
};
</script>

<style lang="less" scoped>
.addPayment {
  border-top: 31rpx solid #f8f6f9;
  .cell-item {
    display: flex;
    align-items: center;
    height: 100rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
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
    }
    .label {
      min-width: 180rpx;
    }
    .placeholder {
      color: #888;
    }
  }
  .tips {
    text-align: center;
    font-size: 24rpx;
    color: #333;
    opacity: 0.5;
    margin: 40rpx 0;
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
}
</style>