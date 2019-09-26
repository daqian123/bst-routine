<template>
  <view class="selectFuelCard">
    <view class="cell-group" v-if="list.length>0">
      <block v-for="(item,index) in list" :key="index">
        <i-swipeout i-class="swipeout-border" :actions="actions" @change="delOil(index,item.id)">
          <view slot="content">
            <view class="cell-item" @click.stop="selectOil(item)">
              <view class="cell-left">{{item.username}}</view>
              <view class="cell-right">
                <view class="cell-right-value">{{item.oilcardnumber}}</view>&nbsp;
              </view>
            </view>
          </view>
        </i-swipeout>
      </block>
    </view>
    <view class="empty" v-else>
      <img src="../../assets/img/info/noneData.png" class="noneData" />
      <view class="empty-tips">暂无搜索记录</view>
    </view>
    <button class="add-btn" @click="addOil">添加加油卡</button>
  </view>
</template>

<script>

export default {
  data() {
    return {
      list: [],
      actions: [
        {
          name: "删除",
          color: "#fff",
          fontsize: "16",
          width: 100,
          background: "#f52533"
        }
      ]
    };
  },
  methods: {
    delOil(index, oid) {
      this.$api.delOil({ oid }).then(res => {
        this.$showSuccess("已删除");
        this.list.splice(index, 1);
      });
    },
    addOil() {
      wx.navigateTo({ url: "../addFuelCard/main" });
    },
    selectOil(item) {
      this.$store.commit("setOilInfo", item);
      wx.navigateBack({ delta: 1 });
    }
  },
  onShow() {
    this.$api.myOilList().then(res => {
      this.list = res.info;
    });
  }
};
</script>
<style lang="less" scoped>
.selectFuelCard {
  border-top: 31rpx solid #f8f6f9;
  .cell-group {
    margin: 0 24rpx;
    .cell-item {
      display: flex;
      justify-content: space-between;
      height: 52rpx;
      line-height: 52rpx;
      box-sizing: border-box;
    }
    .cell-right {
      display: flex;
      &-value {
        color: #999;
      }
    }
  }
  .empty {
    margin: 100rpx 0;
    text-align: center;
    .noneData {
      width: 356rpx;
      height: 205rpx;
    }
    &-tips {
      margin: 40rpx 0;
      font-size: 24rpx;
      color: #929292;
    }
  }
  .add-btn {
    display: block;
    background: #416ce3;
    color: #fff;
    font-size: 32rpx;
    margin: 121rpx 24rpx 40rpx 24rpx;
    height: 80rpx;
    line-height: 80rpx;
    letter-spacing: 8rpx;
    &:active {
      opacity: 0.8;
    }
  }
}
</style>