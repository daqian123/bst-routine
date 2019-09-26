<template>
  <view class="selectGroup">
    <view class="cell" v-for="(item,index) in list" :key="index">
      <view class="cell-left">{{item}}</view>
      <view class="cell-right">
        <!-- <input type="text" placeholder="请输入分组名称" class="input-r" v-if="item.name=='自定义'" /> -->
        <i-radio-group :current="current" @change="changeRadio(index)" i-class="cell-radio">
          <i-radio :checked="index==current"></i-radio>
        </i-radio-group>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      current: 1,
      list: []
    };
  },
  methods: {
    changeRadio(index) {
      this.current = index;
    }
  },
  onLoad() {
    this.$api.selectGroup().then(res => {
      this.list = res.info;
    });
  }
};
</script>
<style lang="less" scoped>
.selectGroup {
  font-size: 30rpx;
  color: #333;
  border-top: 31rpx solid #f8f6f9;
  .cell {
    display: flex;
    justify-content: space-between;
    height: 100rpx;
    line-height: 100rpx;
    margin: 0 24rpx;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    .cell-right {
      display: flex;
    }
    .input-r {
      width: 100%;
      height: 100%;
      text-align: right;
      margin-right: 20rpx;
    }
  }
}
</style>