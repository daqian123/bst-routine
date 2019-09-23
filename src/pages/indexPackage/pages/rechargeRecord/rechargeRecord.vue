<template>
  <view class="rechargeRecord">
    <view class="cell-title">全部交易类型</view>
    <view class="list">
      <view class="list-item" v-for="(item,index) in list" :key="index">
        <view class="list-item-left">
          <view class="list-item-left-top">{{item.title}}</view>
          <view class="list-item-left-center">{{item.pay_type}}</view>
          <view class="list-item-left-bottom">昨天：{{item.create_time}}</view>
        </view>
        <view class="list-item-right">{{item.amount}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      noneData: false,
      noneMore: false,
      params: { page: 1 }
    };
  },
  methods: {
    refreshList() {
      this.loading = true;
      this.noneData = false;
      this.noneMore = false;
      api.rechargeRecord(this.params).then(res => {
        this.loading = false;
        let list = res.info;
        if (list.length == 0) {
          this.noneData = true;
        }
        this.params.page++;
        this.list = list;
      });
    },
    hotPosition() {
      this.loading = true;
      this.noneMore = false;
      this.noneData = false;
      api.rechargeRecord(this.params).then(res => {
        this.loading = false;
        let list = res.info;
        if (list.length == 0) {
          this.noneMore = true;
        } else {
          this.params.page++;
          this.list = this.list.concat(list);
        }
      });
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.params.page = 1;
    this.refreshList();
    wx.stopPullDownRefresh();
  },
  //页面触底事件
  onReachBottom() {
    if (this.noneMore) return;
    this.hotPosition();
  },
  onLoad() {
    this.refreshList();
  }
};
</script>
<style lang="less" scoped>
.cell-title {
  height: 113rpx;
  text-align: center;
  line-height: 113rpx;
  font-size: 30rpx;
  background: #f6f6f6;
  opacity: 0.72;
}
.list {
  &-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 23rpx 24rpx 18rpx 24rpx;
    &:last-child {
      border: none;
    }
    &-left {
      .flexLayout(space-between, flex-start, column);
      line-height: 44rpx;
      flex: 1;
      &-top {
        font-size: 30rpx;
      }
      &-center {
        font-size: 24rpx;
      }
      &-bottom {
        font-size: 24rpx;
      }
    }
    &-right {
      font-size: 48rpx;
      color: #333;
    }
  }
}
</style>