<template>
  <view class="waterFeeRecharge page-bg">
    <view class="head">
      <img src="../../assets/img/info/convenient1_icon_4.png" class="head-icon" />&nbsp;水费
    </view>
    <view class="cell-group">
      <view class="cell-item cell-item-xs">
        <view class="label">应缴金额</view>
        <view class="input-right">{{info.billamount}}</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费单位</view>
        <view class="input-right">{{info.title}}</view>
      </view>
      <view class="cell-item">
        <view class="label">缴费户号</view>
        <view class="input-right">{{info.account}}</view>
      </view>
    </view>
    <button class="add-btn" @click="recharge(info.billamount)">立即缴费</button>
    <navigator url="../rechargeRecord/main">
      <view class="fix-bottom">缴费记录</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      formData: {}
    };
  },
  methods: {
    queryPosts(id) {
      this.$showLoading("正在查询");
      this.$api.queryPosts({ id }).then(res => {
        let { status } = res.info;
        switch (status) {
          case -1:
            setTimeout(() => {
              this.queryPosts();
            }, 3000);
            break;
          case 0:
            wx.hideLoading();
            this.info = res.info;
            break;
          case 1:
            wx.hideLoading();
            this.$showToast("账号查询错误，请仔细核对账号");
            this.info = res.info;
            break;
        }
      });
    },
    recharge(amount) {
      if (!amount) {
        this.$showToast("账号查询错误，请仔细核对账号");
        return;
      }
      this.formData.amount = amount;
      this.$api.addHydroelectricGasOrder(this.formData).then(res => {});
    }
  },
  async onLoad(options) {
    this.formData = {
      amount: null,
      id: options.id
    };
    await this.$api.queryPost({ id: options.id });
    this.queryPosts(options.id);
  }
};
</script>
<style lang="less" scoped src="../../../../../static/less/recharge.less"></style>