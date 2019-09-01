<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
      <el-table :data="tableData">
        <el-table-column prop="date" label="标题"></el-table-column>
        <el-table-column prop="name" label="总评论数"></el-table-column>
        <el-table-column prop="address" label="粉丝评论数"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
      <el-pagination class="pagination"
      background layout="prev, pager, next"
      :total="1000"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      @current-change="changePager"
      ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      tableData: []
    }
  }
}
</script>

<style lang="less" scoped>
.card{
    margin-bottom: 20px;
}
.pagination {
    margin-top: 20px;
    text-align: center;
}
</style>
