<template>
    <div >
        <span>子组件</span>
        <!-- <button @click="send">点击</button> -->
        <button :style="{color:yan}">按钮</button>
        <button>按钮</button>
    </div>
</template>
<script>
export default {
  props: ['yan'],
  //   data () {
  //     return {
  //       msg: '子组件的数据'
  //     }
  //   },
  methods: {
    send () {
      this.$emit('input', this.msg)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
