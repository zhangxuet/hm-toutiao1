<template>
    <el-card class="box-card card">
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="top">
        <el-radio-group v-model="reqParams.collect" size="small" @change="toggleChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">素材</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float: right" @click="openDialog">添加素材</el-button>
      </div>
      <div class="img_list" v-for="item in images" :key="item.id">
        <div class="img_item">
          <img :src="item.url" alt="">
        </div>
        <div class="footer" v-if="!reqParams.collect">
          <span class="el-icon-star-off" :class="{red: item.is_collected}" @click="changeCollect(item)"></span>
          <span class="el-icon-delete" @click="delImg(item.id)"></span>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
        hide-on-single-page
        >
      </el-pagination>
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="400px">

        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
          :headers="headers"
          name="image"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      imageUrl: ''
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    handleSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.$message.success('上传成功')
        this.reqParams.page = 1
        this.getImages()
      }, 500)
    },
    openDialog () {
      this.dialogVisible = true
    },
    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
      })
    },
    toggleChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    async changeCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  position: relative;
  width: 160px;
  height: 160px;
  border:1px dashed #ccc;
  margin-right: 30px;
  display: inline-block;
  margin-top: 20px;
  img {
    width: 160px;
    height: 160px;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0,0,0,0.3);
      text-align: center;
      span {
        margin: 10px;
        &.red {
          color: red
        }
      }
  }
}
.avatar-uploader {
  text-align: center;
}
</style>
