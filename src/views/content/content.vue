<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <my-bread>{{articleId?'编辑':'发布'}}文章</my-bread>
    </div>
    <el-form label-width="80px">
        <el-form-item label="标题：">
            <el-input style="width: 400px" v-model="articlesParams.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor :content="articlesParams.content" :options="editorOption" class="rich" v-model="articlesParams.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articlesParams.cover.type" @change="changeRadio">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
            <div v-if="articlesParams.cover.type === 1">
              <my-public v-model="articlesParams.cover.images[0]"></my-public>
            </div>
            <div v-if="articlesParams.cover.type === 3">
              <my-public v-model="articlesParams.cover.images[0]" class="list"></my-public>
              <my-public v-model="articlesParams.cover.images[1]" class="list"></my-public>
              <my-public v-model="articlesParams.cover.images[2]" class="list"></my-public>
            </div>

        </el-form-item>
        <el-form-item label="频道：">
            <my-channel v-model="articlesParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
            <el-button type="primary" @click="submit(false)">发表</el-button>
            <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
            <el-button type="primary" @click="update(false)">修改</el-button>
            <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      test: '',
      // content: '',
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]

        }
      },
      input: '',
      radio: '1',
      value: '',
      articleId: null,
      articlesParams: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // console.log(this.articleId)
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    async getArticle () {
      // console.log(this.articleId)
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articlesParams = data
      // console.log(this.articlesParams)
    },
    changeRadio () {
      this.articlesParams.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articlesParams)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/articles')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articlesParams)
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/articles')
    }
  }
}
</script>

<style lang="less" scoped>
.rich {
  height: 300px;
  margin-bottom: 50px;
}
.list {
  display: inline-block;
  margin-right: 10px;
}
</style>
