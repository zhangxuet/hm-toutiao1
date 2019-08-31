<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>发布文章</my-bread>
    </div>
    <el-form label-width="80px">
        <el-form-item label="标题：">
            <el-input style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="内容：">

        </el-form-item>
        <el-form-item label="封面：">
            <el-radio v-model="radio" label="1">单图</el-radio>
            <el-radio v-model="radio" label="2">三图</el-radio>
            <el-radio v-model="radio" label="3">无图</el-radio>
            <el-radio v-model="radio" label="4">自动</el-radio>
        </el-form-item>
        <el-form-item label="频道：">
            <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      value: '',
      reqParams: {
        title: null,
        content: null,
        cover: {},
        channel_id: null
      },
      channelOptions: [
        { id: 1, name: 'web' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
