<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
  <el-col :span="12">
    <el-form label-width="100px">
      <el-form-item label="编号：">
        {{reqParams.id}}
      </el-form-item>
      <el-form-item label="手机：">
        {{reqParams.mobile}}
      </el-form-item>
      <el-form-item label="媒体名称：">
        <el-input v-model="reqParams.name"></el-input>
      </el-form-item>
      <el-form-item label="媒体介绍：">
          <el-input v-model="reqParams.intro" type="textarea" :autosize="{ minRows: 3, maxRows: 6}">
          </el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="reqParams.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存设置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="12">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="upload">
        <img v-if="reqParams.photo" :src="reqParams.photo" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
</el-row>

  </el-card>
</template>

<script>
import eventBus from '@/eventBus'
import store from '@/store'
export default {
  data () {
    return {
      textarea2: '',
      reqParams: {
        name: null,
        intro: null,
        email: null
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async upload (result) {
      const file = result.file
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      this.$message.success('修改成功')
      this.reqParams.photo = data.photo
      const localUser = store.getUser()
      localUser.photo = data.photo
      store.setUser(localUser)
      eventBus.$emit('updatePhoto', data.photo)
    },
    async getUser () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.reqParams = data
    },
    async save () {
      const { name, intro, email } = this.reqParams
      await this.$http.patch('user/profile', { name, intro, email })
      this.$message.success('修改成功')
      const localUser = store.getUser()
      localUser.name = name
      store.setUser(localUser)
      eventBus.$emit('updateName', name)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  margin-left: 200px;
}
</style>
