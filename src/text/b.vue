<template>
    <div>
      <a-b>
        <div slot="header" slot-scope="scope">{{scope.msg}}</div>
      </a-b>
      <a-b>
        <div slot="header" slot-scope="scope">{{scope.msg}}</div>
      </a-b>
    </div>
</template>

<script>
import AB from '@/text/a'
export default {
  components: { AB }
}
</script>

<style lang="less" scoped>
</style>
