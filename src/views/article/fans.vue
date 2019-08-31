<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-radio-group v-model="radio3" size="medium">
      <el-radio-button label="上海">粉丝列表</el-radio-button>
      <el-radio-button label="粉丝画像">粉丝画像</el-radio-button>
    </el-radio-group>
    <!-- <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar :size="size" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </el-col>
  </el-row> -->
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
</style>
