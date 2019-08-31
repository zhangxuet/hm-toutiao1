<template>
    <!-- <div>
        父组件{{msg}}
        <com-child @input="fn"></com-child>
    </div> -->
    <div>
        父组件
        <com-child yan="blue"></com-child>
    </div>
</template>

<script>
import ComChild from '@/text/child'
export default {
  components: { ComChild },
  data () {
    return {
      msg: 'hello'
    }
  },
  methods: {
    fn (data) {
      this.msg = data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
