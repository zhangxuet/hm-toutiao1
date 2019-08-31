<template>
    <div>
      <div class="header"><slot name="header" :msg="msg"></slot></div>
      <div class="center"></div>
      <div class="footer"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '插槽'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
