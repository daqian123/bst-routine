<template>
  <view class="rechargeWaterFee page-bg">
    <view class="head">
      <img src="../../assets/img/info/convenient1_icon_5.png" class="head-icon" />&nbsp;燃气费
    </view>
    <view class="cell-group">
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right">合肥供电</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费户号</view>
        <view class="input-right">456764564</view>
      </view>
      <view class="cell-item">
        <view class="label">户名</view>
        <view class="input-right">大钱</view>
      </view>
      <view class="cell-item">
        <view class="label">住址</view>
        <view class="input-right">南翔汽车城</view>
      </view>
      <view class="cell-item">
        <view class="label">当前可用余额</view>
        <view class="input-right">0</view>
      </view>
      <view class="cell-item">
        <view class="label">当前欠费金额</view>
        <view class="input-right">56</view>
      </view>
      <view class="cell-item">
        <view class="label">充值金额</view>
        <view class="input-right">
          <input type="text" placeholder="请输入充值金额" class="input-value" />
        </view>
      </view>
    </view>
    <button class="add-btn">立即充值</button>
    <navigator url="../rechargeRecord/main">
      <view class="fix-bottom">缴费记录</view>
    </navigator>
  </view>
</template>

<script>
import api from "@/api";
import { showModal } from "@/utils/pointDialog";
export default {
  data() {
    return {};
  },
  methods: {
    queryPosts(id) {
      api
        .queryPosts({ id })
        .then(res => {})
        .catch(err => {
          wx.hideToast();
          showModal(res => {
            if (res.confirm) {
              this.queryPosts();
            }
          }, "查询失败，是否继续查询");
        });
    }
  },
  async onLoad(options) {
    await api.queryPost({ id: options.id });
    this.queryPosts(options.id);
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>