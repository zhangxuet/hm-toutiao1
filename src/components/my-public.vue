<template>
    <div>
      <div class="img_btn" @click="openDialog">
        <img :src="value||defaultImgUrl" alt="">
      </div>
      <el-dialog :visible.sync="dialogVisible" width="750px">

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div class="top">
            <el-radio-group v-model="reqParams.collect" size="small" @change="toggleChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
      <div class="img_list"
      :class="{selected: item.url === selectedImgUrl}"
      v-for="item in images"
      :key="item.id" @click="selectedImg(item.url)"
      >
        <div class="img_item">
          <img :src="item.url" alt="">
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
          :headers="headers"
          name="image"
          >
          <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import defaultImgUrl from '../assets/images/default.png'
import store from '@/store'
export default {
  name: 'my-public',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      uploadImgUrl: null,
      selectedImgUrl: null,
      defaultImgUrl,
      // confirmImgUrl: '../assets/images/default.png',
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    confirmSelected () {
      let src = ''
      if (this.activeName === 'image') {
        if (!this.selectedImgUrl) return this.$message.info('请选择一张素材图片')
        src = this.selectedImgUrl
      } else {
        if (!this.uploadImgUrl) return this.$message.info('请选择一张上传图片')
        src = this.uploadImgUrl
      }
      this.$emit('input', src)
      this.dialogVisible = false
    },
    selectedImg (url) {
      this.selectedImgUrl = url
    },
    handleSuccess (res) {
      this.uploadImgUrl = res.data.url
    },
    openDialog () {
      this.uploadImgUrl = null
      this.selectedImgUrl = null
      this.dialogVisible = true
    },
    toggleChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img_btn {
  width: 160px;
  height: 160px;
  border:1px dashed #ccc;
  img {
    width: 160px;
    height: 160px;
  }
}
.img_list {
  position: relative;
  width: 160px;
  height: 120px;
  border:1px dashed #ccc;
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 80px;
    }
  }
  img {
    width: 160px;
    height: 120px;
  }
}
.dialog-footer {
  text-align: center;
}
.avatar-uploader {
  text-align: center;
}
</style>
