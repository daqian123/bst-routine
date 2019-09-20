<template>
  <view class="selectFuelCard">
    <view class="cell-group" v-if="list.length<0">
      <view class="cell-item" v-for="(item,index) in list" :key="index">
        <view class="cell-left">张三</view>
        <view class="cell-right">
          <view class="cell-right-value">156456465456456</view>&nbsp;
          <i-radio-group :current="current" @change="current=index">
            <i-radio :checked="index==current"></i-radio>
          </i-radio-group>
        </view>
      </view>
    </view>
    <view class="empty">
      <img src="../../assets/img/info/noneData.png" class="noneData" />
      <view class="empty-tips">暂无搜索记录</view>
    </view>
    <button class="add-btn">添加加油卡</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      list: [1, 2, 2]
    };
  }
};
</script>

<style lang="less" scoped>
.selectFuelCard {
  border-top: 31rpx solid #f8f6f9;
  .cell-group {
    .cell-item {
      display: flex;
      justify-content: space-between;
      height: 100rpx;
      line-height: 100rpx;
      margin: 0 24rpx;
      border-bottom: 1px solid #eee;
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