<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
      <el-table :data="comment">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" v-if="scope.row.comment_status" @click="changeStatus(scope.row)">关闭评论</el-button>
            <el-button type="success" v-else @click="changeStatus(scope.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
      background layout="prev, pager, next"
      :total="total"
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
      comment: [],
      total: 0
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async changeStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    async getComment () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comment = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComment()
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
