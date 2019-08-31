<template>
  <el-select :value="value" placeholder="请选择" @change="changeChannel" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    changeChannel (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
