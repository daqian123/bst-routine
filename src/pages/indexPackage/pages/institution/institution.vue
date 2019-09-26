<template>
  <view class="waterPlant">
    <view class="list search">
      <view class="title">缴费单位</view>
      <view class="picker-date">
        <picker mode="region" @change="changeRegion" :value="region">
          <view class="picker">
            {{region[1]}}&nbsp;
            <van-icon name="arrow-down" />
          </view>
          <!-- <i class="iconfont icon-down-trangle"></i>
          -->
        </picker>
      </view>
    </view>
    <view
      class="list"
      v-for="(item,index) in list"
      :key="index"
      @click="changeInsitution(item)"
    >{{item.title}}</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      region: [],
      list: [],
      params: {
        area_code: ""
      },
      type: ""
    };
  },
  methods: {
    changeRegion(e) {
      let { value, code } = e.mp.detail;
      this.list = value;
      this.institutions(code[2]);
    },
    changeInsitution(item) {
      this.$store.commit("setInstitution", item);
      wx.navigateBack({ delta: 1 });
    },
    institutions(area_code) {
      this.$api.institutions({ area_code, type: this.type }).then(res => {
        this.list = res.info;
      });
    }
  },
  onLoad(options) {
    this.type = options.type;
    let { code, city, province, district } = wx.getStorageSync("address");
    this.region = [province, city, district];
    this.institutions(code);
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