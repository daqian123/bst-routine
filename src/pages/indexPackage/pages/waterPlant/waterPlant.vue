<template>
  <view class="waterPlant">
    <view class="list search">
      <view class="title">缴费单位</view>
      <view class="picker-date">
        <picker mode="region" @change="bindPickerChange" :value="region">
          <view class="picker">
            {{region[1]}}&nbsp;
            <van-icon name="arrow-down" />
          </view>
          <!-- <i class="iconfont icon-down-trangle"></i>
          -->
        </picker>
      </view>
    </view>
    <view class="list" v-for="(item,index) in list" :key="index">{{item.name}}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      region: ["安徽省", "合肥市"],
      list: [
        { id: 0, name: "长丰双墩水厂" },
        { id: 1, name: "合肥供水集团有限公司" },
        { id: 2, name: "合肥龙岗自来水有限公司" },
        { id: 3, name: "肥东自来水厂" },
        { id: 4, name: "肥西自来水有限公司" },
        { id: 5, name: "庐江县供水有限责任公司" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.waterPlant {
  font-size: 30rpx;
  color: #333;
  .list {
    height: 100rpx;
    line-height: 100rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }
  .search {
    display: flex;
    justify-content: space-between;
  }
  .picker {
    display: flex;
    align-items: center;
  }
}
</style>