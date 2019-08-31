<template>
  <div>
    <el-card class="box-card card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="状态：">
          <template>
            <el-radio v-model="reqParams.status" :label="null">全部</el-radio>
            <el-radio v-model="reqParams.status" :label="0">草稿</el-radio>
            <el-radio v-model="reqParams.status" :label="1">待审核</el-radio>
            <el-radio v-model="reqParams.status" :label="2">审核通过</el-radio>
            <el-radio v-model="reqParams.status" :label="3">审核失败</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card">
      <div slot="header" class="clearfix">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="contain">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt="">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/content?id='+scope.row.id)"></el-button>
            <el-button @click="delArticle(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
      background layout="prev, pager, next"
      :total="total"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      @current-change="changePager"
      hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '@/components/bread'
export default {
//   components: { MyBread },
  created () {
    // this.getChannelOptions()
    this.getAriteicles()
  },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin__pubdate: null,
        end__pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      date: '',
      articles: [],
      total: 0
    }
  },
  methods: {
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getAriteicles()
      }).catch(() => {
      })
    },
    search () {
      this.reqParams.page = 1
      this.getAriteicles()
    },
    changeDate (valueArr) {
      console.log(valueArr)
      if (valueArr) {
        this.reqParams.begin__pubdate = valueArr[0]
        this.reqParams.end__pubdate = valueArr[1]
      } else {
        this.reqParams.begin__pubdate = null
        this.reqParams.end__pubdate = null
      }
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getAriteicles()
    },
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getAriteicles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
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
