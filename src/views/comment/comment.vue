<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-pagination class="pagination"
      background layout="prev, pager, next"
      :total="total"
      >
      </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        type: null,
        sourse: null,
        offset: null,
        limit: null
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async getComment () {
      const { data: { data } } = this.$http.get('comments', { params: this.reqParams, allow_comment: true })
      this.tableData = data.results
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
