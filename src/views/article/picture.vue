<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>素材管理</my-bread>
    </div>
    <div>
      <el-radio-group v-model="reqParams.collect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button size="small" style="float: right" type="success">添加素材</el-button>
    </div>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="reqParams.page"
    :page-size="reqParams.per_page"
    @current-change="changePager"
    >
  </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 0
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
