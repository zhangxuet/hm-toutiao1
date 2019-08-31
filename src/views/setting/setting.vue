<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>个人设置</my-bread>
    </div>
    <el-form label-width="100px">
      <el-form-item label="编号：">
        1
      </el-form-item>
      <el-form-item label="手机：">
        13911111111
      </el-form-item>
      <el-form-item label="媒体名称：">
        <el-input placeholder="GI轮" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="媒体介绍：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}"
              placeholder="My superhero" style="width: 50%">
          </el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input placeholder="9999@qq.com" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存设置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      textarea2: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
