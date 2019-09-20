<template>
  <div class="pagination">
    <div v-if="loading||noneMore" class="loading">
      <i-load-more :tip="noneMore?'没有更多了':''" :loading="loading"/>
    </div>
    <div v-if="noneData" class="noneData">
      <img src="/static/img/noneData.png">
    </div>
  </div>
</template>
<script>
export default {
  props: ["loading", "noneData", "noneMore"]
};
</script>

<style scoped lang="less">
.pagination {
  .noneData {
    text-align: center;
    padding: 20px;
  }
  .noneData img {
    width: 348rpx;
    height: 265rpx;
  }
  .noneMore {
    background: #f5f5f9;
    font-size: 12px;
    color: #666;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
}
</style>
